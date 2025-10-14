import funcionarioController from "../controllers/funcionarioController.js";

export default async function (fastify, opts) {
  // Listar todos os usuários
  fastify.get("/", funcionarioController.list);

  // Obter usuário pelo ID
  fastify.get("/:funcod", funcionarioController.getById);

  // Criar usuário
  fastify.post("/", funcionarioController.create);

  // Atualizar usuário
  fastify.put("/:funcod", funcionarioController.update);

  // Remover usuário
  fastify.delete("/:funcod", funcionarioController.remove);
}
