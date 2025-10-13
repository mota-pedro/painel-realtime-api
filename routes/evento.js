import eventController from "../controllers/eventoController.js";

export default async function (fastify, opts) {
  fastify.post("/", eventController.receiveEvento);

  fastify.get("/:empresa_id/latest", eventController.getLatestForEmpresa);
}
