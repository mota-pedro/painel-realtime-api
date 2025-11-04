import vinculosService from "../services/vinculosService.js";
import modelos from "../models/modelos.js";

const { Vinculo } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (Vinculo && typeof Vinculo.mapearParaJson === "function") return Vinculo.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = Vinculo.fromJson(req.body);
    console.log("Payload vinculo:", payload);

    const created = await vinculosService.create(payload);

    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = Vinculo.fromJson(req.body);

    const updated = await vinculosService.update(id, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const f = await vinculosService.getById(id);
    if (!f) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(f));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listAllByEmpresa = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await vinculosService.listByProprio(prpcod);
    return reply.send(mapResult(rows));
  }
  catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await vinculosService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, listAllByEmpresa, remove };
