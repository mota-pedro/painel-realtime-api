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

  fastify.decorate("emitToEmpresa", (prpcod, eventName, payload) => {
    const room = `empresa_${prpcod}`;
    fastify.io.to(room).emit(eventName, payload);
  });

  // middleware de autenticação
  fastify.io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication error: token required"));
      }

      const decoded = jwt.verify(token, jwtSecret);

      socket.user = {
        funcod: decoded.funcod,
        funcpf: decoded.funcpf,
      };

      return next();
    } catch (err) {
      return next(new Error("Authentication error: invalid token"));
    }
  });


  // handle connections
  fastify.io.on("connection", (socket) => {
    fastify.log.info(
      `Socket connected: ${socket.id} (user=${socket.user?.funcod || "unknown"})`
    );

    // join-empresa
    socket.on("join-empresa", (data, cb) => {
      try {
        if (!socket.user) {
          return cb && cb({ error: "not_authenticated" });
        }

        const { prpcod, funcod } = data;

        if (!prpcod) return cb && cb({ error: "prpcod_required" });
        if (!funcod) return cb && cb({ error: "funcod_required" });

        // valida se o funcod do token bate com o enviado
        if (socket.user.funcod !== funcod) {
          fastify.log.warn(
            `Funcod do token (${socket.user.funcod}) diferente do enviado (${funcod})`
          );
          return cb && cb({ error: "forbidden" });
        }

        const room = `empresa_${prpcod}`;
        socket.join(room);
        fastify.log.info(`Socket ${socket.id} joined ${room}`);
        return cb && cb({ ok: true, room });
      } catch (err) {
        fastify.log.error(err);
        return cb && cb({ error: "internal_error" });
      }
    });


    socket.on("leave-empresa", (prpcod) => {
      if (!prpcod) return;
      const room = `empresa_${prpcod}`;
      socket.leave(room);
      fastify.log.info(`Socket ${socket.id} left ${room}`);
    });

    socket.on("disconnect", (reason) => {
      fastify.log.info(`Socket ${socket.id} disconnected: ${reason}`);
    });
  });
});
