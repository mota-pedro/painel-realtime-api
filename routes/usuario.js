import usuarioController from "../controllers/usuarioController.js";

export default async function (fastify, opts) {
  // Listar todos os usuários
  fastify.get("/", usuarioController.list);

  // Obter usuário pelo ID
  fastify.get("/:id", usuarioController.getById);

  // Criar usuário
  fastify.post("/", usuarioController.create);

  // Atualizar usuário
  fastify.put("/:id", usuarioController.update);

  // Remover usuário
  fastify.delete("/:id", usuarioController.remove);
}
