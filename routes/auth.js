import authController from "../controllers/authController.js";

export default async function (fastify, opts) {
  fastify.post("/login", authController.login);
  fastify.post("/cadastro", authController.cadastro);
}
