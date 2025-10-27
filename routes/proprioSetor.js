import proprioSetorController from "../controllers/proprioSetorController.js";

export default async function (fastify, opts) {
  fastify.post("/", proprioSetorController.create);
  fastify.get("/empresa/:prpcod", proprioSetorController.listByProprio);
  fastify.get("/:prpsetcod", proprioSetorController.getById);
  fastify.put("/:prpsetcod", proprioSetorController.update);
  fastify.delete("/:prpsetcod", proprioSetorController.remove);
}
