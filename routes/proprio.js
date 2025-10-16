import proprioController from "../controllers/proprioController.js";

export default async function (fastify, opts) {
  // Listar todas as empresas
  fastify.get("/", proprioController.list);

  // Obter empresa pelo ID
  fastify.get("/:prpcod", proprioController.getById);

  // Obter apenas PRPCOD, PRPDES e PRPCGC da empresa pelo ID
  fastify.get("/public/:prpcod", proprioController.secureGetById);

  // Criar empresa
  fastify.post("/", proprioController.create);

  // Atualizar empresa
  fastify.put("/:prpcod", proprioController.update);

  // Remover empresa
  fastify.delete("/:prpcod", proprioController.remove);
}
