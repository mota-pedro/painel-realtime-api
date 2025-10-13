import empresaService from "../services/empresaService.js";

const create = async (req, reply) => {
  try {
    const { nome, telefone, cnpj, ativo } = req.body;
    const empresa = await empresaService.create({
      nome,
      telefone,
      cnpj,
      ativo,
    });
    return reply.send(empresa);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const empresa = await empresaService.update(id, req.body);
    return reply.send(empresa);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const empresa = await empresaService.getById(id);
    if (!empresa) return reply.status(404).send({ error: "not_found" });
    return reply.send(empresa);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const empresas = await empresaService.list();
    return reply.send(empresas);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await empresaService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, list, remove };
