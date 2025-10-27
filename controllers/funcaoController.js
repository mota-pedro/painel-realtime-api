import funcService from "../services/funcaoService.js";
import modelos from "../models/modelos.js";

const { Funcao } = modelos;

const create = async (req, reply) => {
  try {
    const payload = Funcao.fromJson(req.body);

    const created = await funcService.create(payload);

    const result = Funcao.mapearParaJson(created);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { fnccod } = req.params;
    const data = Funcao.fromJson(req.body);

    const updated = await funcService.update(fnccod, data);

    const result = Funcao.mapearParaJson(updated);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listBySetor = async (req, reply) => {
  try {
    const { setcod } = req.params;
    const rows = await funcService.listBySetor(setcod);

    const result = Funcao.mapearParaJson(rows);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await funcService.listByProprio(prpcod);
    const result = Funcao.mapearParaJson(rows);
    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { fnccod } = req.params;
    const f = await funcService.getById(fnccod);
    if (!f) return reply.status(404).send({ error: "not_found" });

    const result = Funcao.mapearParaJson(f);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { fnccod } = req.params;
    await funcService.remove(fnccod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listBySetor, listByProprio, getById, remove };
