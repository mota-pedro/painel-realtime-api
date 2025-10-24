import proprioService from "../services/proprioService.js";
import { maskCnpj } from "../utils/stringUtils.js";
import modelos from "../models/modelos.js";

const { Proprio } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (Proprio && typeof Proprio.mapearParaJson === "function") return Proprio.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const payload = Proprio && typeof Proprio.fromJson === "function"
      ? Proprio.fromJson(req.body)
      : req.body;

    const proprio = await proprioService.create(payload);

    return reply.send(mapResult(proprio));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const payload = Proprio && typeof Proprio.fromJson === "function"
      ? Proprio.fromJson(req.body)
      : req.body;

    const proprio = await proprioService.update(prpcod, payload);
    return reply.send(mapResult(proprio));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const proprio = await proprioService.getById(prpcod);
    if (!proprio) return reply.status(404).send({ error: "not_found" });

    return reply.send(mapResult(proprio));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const proprios = await proprioService.list();
    return reply.send(mapResult(proprios));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    await proprioService.remove(prpcod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, list, remove };
