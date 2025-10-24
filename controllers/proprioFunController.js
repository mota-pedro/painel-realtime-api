import proprioFunService from "../services/proprioFunService.js";
import modelos from "../models/modelos.js";

const { ProprioFuncionario } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (ProprioFuncionario && typeof ProprioFuncionario.mapearParaJson === "function") return ProprioFuncionario.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = ProprioFuncionario && typeof ProprioFuncionario.fromJson === "function"
      ? ProprioFuncionario.fromJson(req.body)
      : req.body;

    const created = await proprioFunService.create(payload);
    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { prpfuncod } = req.params;
    const data = ProprioFuncionario && typeof ProprioFuncionario.fromJson === "function"
      ? ProprioFuncionario.fromJson(req.body)
      : req.body;

    const updated = await proprioFunService.update(prpfuncod, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await proprioFunService.listByProprio(prpcod);
    return reply.send(mapResult(rows));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listByFuncionario = async (req, reply) => {
  try {
    const { funcod } = req.params;
    const rows = await proprioFunService.listByFuncionario(funcod);
    return reply.send(mapResult(rows));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { prpfuncod } = req.params;
    const p = await proprioFunService.getById(prpfuncod);
    if (!p) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(p));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { prpfuncod } = req.params;
    await proprioFunService.remove(prpfuncod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listByProprio, listByFuncionario, getById, remove };
