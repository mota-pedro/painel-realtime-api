import funcService from "../services/funcaoService.js";

const create = async (req, reply) => {
  try {
    const { empresa_id, nome, descricao, ativo } = req.body;
    const created = await funcService.create({
      empresa_id,
      nome,
      descricao,
      ativo,
    });
    return reply.send(created);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await funcService.update(id, data);
    return reply.send(updated);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByEmpresa = async (req, reply) => {
  try {
    const { empresa_id } = req.params;
    const rows = await funcService.listByEmpresa(empresa_id);
    return reply.send(rows);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const f = await funcService.getById(id);
    if (!f) return reply.status(404).send({ error: "not_found" });
    return reply.send(f);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await funcService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listByEmpresa, getById, remove };
