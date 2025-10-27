import proprioSetorService from "../services/proprioFunService.js";
import modelos from "../models/modelos.js";

const { ProprioFuncionario: ProprioSetor } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (ProprioSetor && typeof ProprioSetor.mapearParaJson === "function") return ProprioSetor.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = ProprioSetor.fromJson(req.body);

    const created = await proprioSetorService.create(payload);
    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { prpsetcod } = req.params;
    const data = ProprioSetor.fromJson(req.body);

    const updated = await proprioSetorService.update(prpsetcod, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await proprioSetorService.listByProprio(prpcod);
    return reply.send(mapResult(rows));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { prpsetcod } = req.params;
    const p = await proprioSetorService.getById(prpsetcod);
    if (!p) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(p));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { prpsetcod } = req.params;
    await proprioSetorService.remove(prpsetcod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listByProprio, getById, remove };
