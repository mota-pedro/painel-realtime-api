import funcController from "../controllers/funcaoController.js";

export default async function (fastify, opts) {
  fastify.post("/", funcController.create);
  fastify.get("/setor/:setcod", funcController.listBySetor);
  fastify.get("/:fnccod", funcController.getById);
  fastify.put("/:fnccod", funcController.update);
  fastify.delete("/:fnccod", funcController.remove);
}
