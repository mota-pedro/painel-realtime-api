import movimentacaoController from "../controllers/movimentacaoController.js";

export default async function (fastify, opts) {
  fastify.post("/", movimentacaoController.create);
  fastify.get("/empresa/:prpcod", movimentacaoController.listByProprio);
  fastify.get("/:mpncod", movimentacaoController.getById);
  fastify.put("/:mpncod", movimentacaoController.update);
  fastify.delete("/:mpncod", movimentacaoController.remove);
}
