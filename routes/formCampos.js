import formCamposController from "../controllers/formCamposController.js";

export default async function (fastify, opts) {
  fastify.post("/", formCamposController.create);
  fastify.get("/:id", formCamposController.getById);
  fastify.get("/empresa/:prpcod", formCamposController.listAllByEmpresa);
  fastify.put("/:id", formCamposController.update);
  fastify.delete("/:id", formCamposController.remove);
}
