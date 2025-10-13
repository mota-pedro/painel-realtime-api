import fp from "fastify-plugin";
import fastifySocketIo from "fastify-socket.io";
import jwt from "jsonwebtoken";
import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import { jwtSecret } from "../utils/jwt.js";

export default fp(async (fastify, opts) => {
  // registra socket.io
  await fastify.register(fastifySocketIo, {
    cors: { origin: true, methods: ["GET", "POST"] },
  });

  // Se tiver REDIS_URL, seria possivel configurar adapter para escalar entre instâncias
  const redisUrl = process.env.REDIS_URL || process.env.REDIS;
  if (redisUrl) {
    fastify.log.info("Configuring Redis adapter for socket.io");
    const pubClient = new Redis(redisUrl);
    const subClient = pubClient.duplicate();
    fastify.io.adapter(createAdapter(pubClient, subClient));
  }

  fastify.decorate("emitToEmpresa", (empresa_id, eventName, payload) => {
    const room = `empresa_${empresa_id}`;
    fastify.io.to(room).emit(eventName, payload);
  });

  // middleware de autenticação
  fastify.io.use((socket, next) => {
    try {
      const token = socket.handshake.auth && socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error: token required"));
      }
      const decoded = jwt.verify(token, jwtSecret);

      socket.user = {
        id: decoded.id,
        email: decoded.email,
        empresa_id: decoded.empresa_id,
        role: decoded.role || "user",
      };
      return next();
    } catch (err) {
      return next(new Error("Authentication error: invalid token"));
    }
  });

  // handle connections
  fastify.io.on("connection", (socket) => {
    fastify.log.info(
      `Socket connected: ${socket.id} (user=${socket.user?.email || "unknown"})`
    );

    // join-empresa
    socket.on("join-empresa", (empresa_id, cb) => {
      try {
        if (!socket.user) {
          return cb && cb({ error: "not_authenticated" });
        }
        if (!empresa_id) return cb && cb({ error: "empresa_id_required" });

        if (socket.user.empresa_id !== empresa_id) {
          fastify.log.warn("Token invalido");
          return cb && cb({ error: "forbidden" });
        }

        const room = `empresa_${empresa_id}`;
        socket.join(room);
        fastify.log.info(`Socket ${socket.id} joined ${room}`);
        return cb && cb({ ok: true, room });
      } catch (err) {
        fastify.log.error(err);
        return cb && cb({ error: "internal_error" });
      }
    });

    socket.on("leave-empresa", (empresa_id) => {
      if (!empresa_id) return;
      const room = `empresa_${empresa_id}`;
      socket.leave(room);
      fastify.log.info(`Socket ${socket.id} left ${room}`);
    });

    socket.on("disconnect", (reason) => {
      fastify.log.info(`Socket ${socket.id} disconnected: ${reason}`);
    });
  });
});
