import usuarioService from "../services/usuarioService.js";

const create = async (req, reply) => {
  try {
    const { empresa_id, nome, email, telefone, cpf, senha, ativo } = req.body;
    let usuario = await usuarioService.create({
      empresa_id,
      nome,
      email,
      telefone,
      cpf,
      senha,
      ativo,
    });

    usuario = usuario.toJSON();
    delete usuario.senha;

    return reply.send(usuario);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    let usuario = await usuarioService.update(id, req.body);
    usuario = usuario.toJSON();
    delete usuario.senha;
    return reply.send(usuario);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.getById(id);
    if (!usuario)
      return reply.status(404).send({ error: "Usuário não encontrado" });
    return reply.send(usuario);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const usuarios = await usuarioService.list();
    return reply.send(usuarios);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await usuarioService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, list, remove };
