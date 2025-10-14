import funcService from "../services/funcaoService.js";

const create = async (req, reply) => {
  try {
    const { 
      fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver 
    } = req.body;
    const created = await funcService.create({
      fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver
    });
    return reply.send(created);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { fnccod } = req.params;
    const data = req.body;
    const updated = await funcService.update(fnccod, data);
    return reply.send(updated);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listBySetor = async (req, reply) => {
  try {
    const { setcod } = req.params;
    const rows = await funcService.listBySetor(setcod);
    return reply.send(rows);
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
    return reply.send(f);
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

export default { create, update, listBySetor, getById, remove };
