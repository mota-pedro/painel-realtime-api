import empresaController from "../controllers/empresaController.js";

export default async function (fastify, opts) {
  // Listar todas as empresas
  fastify.get("/", empresaController.list);

  // Obter empresa pelo ID
  fastify.get("/:id", empresaController.getById);

  // Criar empresa
  fastify.post("/", empresaController.create);

  // Atualizar empresa
  fastify.put("/:id", empresaController.update);

  // Remover empresa
  fastify.delete("/:id", empresaController.remove);
}
