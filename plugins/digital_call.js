import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/jwt.js";

export default fp(async (fastify, opts) => {
  const io = fastify.io.of("/digital-call");

  // Autenticação
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.query?.token;

      if (!token) {
        return next(new Error("Authentication error: token required"));
      }

      const decoded = jwt.verify(token, jwtSecret);

      socket.user = {
        funcod: decoded.funcod,
        empresaId: decoded.empresaId,
      };

      return next();
    } catch (err) {
      return next(new Error("Authentication error: invalid token"));
    }
  });

  // Emissão de eventos
  fastify.decorate("emitDigitalCall", (empresaId, eventName, data) => {
    if (!empresaId || !data) {
      fastify.log.error("emitDigitalCall: empresaId e data são obrigatórios");
      return;
    }

    const room = `empresa_digital_call_${empresaId}`;    
    io.to(room).emit(eventName, data);

    fastify.log.info(`Digital call emitida para ${room}: ${JSON.stringify(data)}`);
  });

  // Conexões
  io.on("connection", (socket) => {
    fastify.log.info(
      `Socket connected to /digital-call: ${socket.id} (user=${socket.user?.funcod})`
    );

    socket.on("join-empresa-digital-call", (data, cb) => {
      const { prpcod } = data;
      if (!prpcod) {
        console.log("prpcod_required");
        return cb && cb({ error: "prpcod_required" });
      }
      if (socket.user.empresaId !== prpcod) {
        return cb && cb({ error: "forbidden" });
      }

      const room = `empresa_digital_call_${prpcod}`;
      socket.join(room);
      fastify.log.info(`Socket ${socket.id} joined ${room}`);
      return cb && cb({ ok: true, room });
    });

    socket.on("leave-empresa-digital-call", (prpcod) => {
      if (!prpcod) return;
      const room = `empresa_digital_call_${prpcod}`;
      socket.leave(room);
      fastify.log.info(`Socket ${socket.id} left ${room}`);
    });

    socket.on("disconnect", (reason) => {
      fastify.log.info(`Socket ${socket.id} disconnected: ${reason}`);
    });
  });
});
