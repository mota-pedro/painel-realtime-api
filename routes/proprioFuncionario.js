import proprioFunController from "../controllers/proprioFunController.js";

export default async function (fastify, opts) {
  fastify.post("/", proprioFunController.create);
  fastify.get("/empresa/:prpcod", proprioFunController.listByProprio);
  fastify.get("/funcionario/:funcod", proprioFunController.listByFuncionario);
  fastify.get("/:prpfuncod", proprioFunController.getById);
  fastify.put("/:prpfuncod", proprioFunController.update);
  fastify.delete("/:prpfuncod", proprioFunController.remove);
}
