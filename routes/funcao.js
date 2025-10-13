import funcController from "../controllers/funcaoController.js";

export default async function (fastify, opts) {
  fastify.post("/", funcController.create);
  fastify.get("/empresa/:empresa_id", funcController.listByEmpresa);
  fastify.get("/:id", funcController.getById);
  fastify.put("/:id", funcController.update);
  fastify.delete("/:id", funcController.remove);
}
