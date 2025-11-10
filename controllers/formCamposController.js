import formCamposService from "../services/formCamposService.js";
import modelos from "../models/modelos.js";

const { FormCampos } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (FormCampos && typeof FormCampos.mapearParaJson === "function") return FormCampos.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = FormCampos.fromJson(req.body);
    console.log("Payload campo formulario:", payload);

    const created = await formCamposService.create(payload);

    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = FormCampos.fromJson(req.body);

    const updated = await formCamposService.update(id, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const f = await formCamposService.getById(id);
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
    const rows = await formCamposService.listByProprio(prpcod);
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
    await formCamposService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, listAllByEmpresa, remove };
