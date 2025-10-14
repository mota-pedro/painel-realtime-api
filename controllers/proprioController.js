import proprioService from "../services/proprioService.js";

const create = async (req, reply) => {
  try {
    const { 
      prpdes, 
      prpfan, 
      prpcgc, 
      prpierg,
      prpincmun,
      prpend,
      prpcmp,
      prpnum,
      prpbai,
      prpmun,
      prpuf,
      prpcep,
      prpcodibge,
      prptel,
      prpemail,
      prpresp,
      prplogo,
      prpobs,
      prpdatcad,
      modpnlcod 
    } = req.body;
    const proprio = await proprioService.create({
      prpdes, 
      prpfan, 
      prpcgc, 
      prpierg,
      prpincmun,
      prpend,
      prpcmp,
      prpnum,
      prpbai,
      prpmun,
      prpuf,
      prpcep,
      prpcodibge,
      prptel,
      prpemail,
      prpresp,
      prplogo,
      prpobs,
      prpdatcad,
      modpnlcod 
    });
    return reply.send(proprio);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const proprio = await proprioService.update(prpcod, req.body);
    return reply.send(proprio);
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
    return reply.send(proprio);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const proprios = await proprioService.list();
    return reply.send(proprios);
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
