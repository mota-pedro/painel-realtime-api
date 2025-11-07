import movimentacaoPagerController from "../controllers/movimentacaoPagerController.js";

export default async function (fastify, opts) {
  fastify.post("/", movimentacaoPagerController.create);
  fastify.get("/empresa/:prpcod", movimentacaoPagerController.listByProprio);
  fastify.get("/:id", movimentacaoPagerController.getById);
  fastify.put("/:id", movimentacaoPagerController.update);
  fastify.delete("/:id", movimentacaoPagerController.remove);
}
