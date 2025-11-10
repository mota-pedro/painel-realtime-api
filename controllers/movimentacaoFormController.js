import movimentacaoFormService from "../services/movimentacaoFormService.js";
import modelos from "../models/modelos.js";

const { MovimentacaoPagerCampos } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (MovimentacaoPagerCampos && typeof MovimentacaoPagerCampos.mapearParaJson === "function") return MovimentacaoPagerCampos.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = MovimentacaoPagerCampos.fromJson(req.body);
    console.log("Payload:", payload);

    const created = await movimentacaoFormService.create(payload);

    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = MovimentacaoPagerCampos.fromJson(req.body);

    const updated = await movimentacaoFormService.update(id, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const f = await movimentacaoFormService.getById(id);
    if (!f) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(f));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listAllByMovId = async (req, reply) => {
  try {
    const { movPagerId } = req.params;
    const rows = await movimentacaoFormService.listByMovId(movPagerId);
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
    await movimentacaoFormService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, listAllByMovId, remove };
