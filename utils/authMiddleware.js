import jwt from "jsonwebtoken";
import { jwtSecret } from "./jwt.js";

export const verifyToken = async (req, reply) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ error: "Token ausente ou inválido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);

    req.user = {
      funcod: decoded.funcod,
      prpcod: decoded.prpcod,
    };
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido ou expirado" });
  }
};
