import vinculosController from "../controllers/vinculosController.js";

export default async function (fastify, opts) {
  fastify.post("/", vinculosController.create);
  fastify.get("/:id", vinculosController.getById);
  fastify.get("/empresa/:prpcod", vinculosController.listAllByEmpresa);
  fastify.put("/:id", vinculosController.update);
  fastify.delete("/:id", vinculosController.remove);
}
