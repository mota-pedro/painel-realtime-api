import setorController from "../controllers/setorController.js";

export default async function (fastify, opts) {
  fastify.post("/", setorController.create);
  fastify.get("/:setcod", setorController.getById);
  fastify.get("/empresa/:prpcod", setorController.listAllByEmpresa);
  fastify.put("/:setcod", setorController.update);
  fastify.delete("/:setcod", setorController.remove);
}
