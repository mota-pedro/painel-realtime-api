import funcionarioService from "../services/funcaoService.js";

const create = async (req, reply) => {
  try {
    const {   
      fundes,
      funcpf,
      funrg,
      funend,
      funbai,
      funcmp,
      funnum,
      funmun,
      funuf,
      funcep,
      funcodibge,
      funtel,
      funemail,
      funfotdoc,
      funobs,
      funlog,
      funsen,
      fundatcad,
      funati 
    } = req.body;
    let funcionario = await funcionarioService.create({
      fundes,
      funcpf,
      funrg,
      funend,
      funbai,
      funcmp,
      funnum,
      funmun,
      funuf,
      funcep,
      funcodibge,
      funtel,
      funemail,
      funfotdoc,
      funobs,
      funlog,
      funsen,
      fundatcad,
      funati 
    });

    funcionario = funcionario.toJSON();
    delete funcionario.funsen;

    return reply.send(funcionario);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { funcod } = req.params;
    let funcionario = await funcionarioService.update(funcod, req.body);
    funcionario = funcionario.toJSON();
    delete funcionario.funsen;
    return reply.send(funcionario);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { funcod } = req.params;
    const funcionario = await funcionarioService.getById(funcod);
    if (!funcionario)
      return reply.status(404).send({ error: "Funcionário não encontrado" });
    return reply.send(funcionario);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const funcionarios = await funcionarioService.list();
    return reply.send(funcionarios);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { funcod } = req.params;
    await funcionarioService.remove(funcod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, list, remove };
