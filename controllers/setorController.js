import setorService from "../services/setorService.js";
import modelos from "../models/modelos.js";

const { Setor } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (Setor && typeof Setor.mapearParaJson === "function") return Setor.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = Setor.fromJson(req.body);
    console.log("Payload setor:", payload);

    const created = await setorService.create(payload);

    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { setcod } = req.params;
    const data = Setor.fromJson(req.body);

    const updated = await setorService.update(setcod, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { setcod } = req.params;
    const f = await setorService.getById(setcod);
    if (!f) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(f));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { setcod } = req.params;
    await setorService.remove(setcod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, remove };
