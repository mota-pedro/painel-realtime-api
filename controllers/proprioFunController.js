import proprioFunService from "../services/proprioFunService.js";

const create = async (req, reply) => {
  try {
    const { 
        prpcod, funcod
    } = req.body;
    const created = await proprioFunService.create({
      prpcod, funcod
    });
    return reply.send(created);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { prpfuncod } = req.params;
    const data = req.body;
    const updated = await proprioFunService.update(prpfuncod, data);
    return reply.send(updated);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await proprioFunService.listByProprio(prpcod);
    return reply.send(rows);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listByFuncionario = async (req, reply) => {
  try {
    const { funcod } = req.params;
    const rows = await proprioFunService.listByFuncionario(funcod);
    return reply.send(rows);
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
    return reply.send(p);
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
