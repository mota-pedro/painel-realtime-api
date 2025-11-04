import pagerController from "../controllers/pagerController.js";

export default async function (fastify, opts) {
  fastify.post("/", pagerController.create);
  fastify.get("/:id", pagerController.getById);
  fastify.get("/empresa/:prpcod", pagerController.listAllByEmpresa);
  fastify.put("/:id", pagerController.update);
  fastify.delete("/:id", pagerController.remove);
}
