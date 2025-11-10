import movimentacaoFormController from "../controllers/movimentacaoFormController.js";

export default async function (fastify, opts) {
  fastify.post("/", movimentacaoFormController.create);
  fastify.get("/:id", movimentacaoFormController.getById);
  fastify.get("/empresa/:id", movimentacaoFormController.listAllByMovId);
  fastify.put("/:id", movimentacaoFormController.update);
  fastify.delete("/:id", movimentacaoFormController.remove);
}
