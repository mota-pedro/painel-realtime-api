import setorService from "../services/setorService.js";

const create = async (req, reply) => {
  try {
    const { 
      setdes, setdatcad 
    } = req.body;
    const created = await setorService.create({
      setdes, setdatcad
    });
    return reply.send(created);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { setcod } = req.params;
    const data = req.body;
    const updated = await setorService.update(setcod, data);
    return reply.send(updated);
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
    return reply.send(f);
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
