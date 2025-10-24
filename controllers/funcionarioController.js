import modelos from "../models/modelos.js";
import funcionarioService from "../services/funcionarioService.js";

const { Funcionario } = modelos;

const sanitizeSenha = (obj) => {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map((o) => { const c = { ...o }; delete c.funsen; return c; });
  const copy = { ...obj };
  delete copy.funsen;
  return copy;
};

const create = async (req, reply) => {
  try {
    const payload = Funcionario && typeof Funcionario.fromJson === "function"
      ? Funcionario.fromJson(req.body)
      : req.body;

    let funcionario = await funcionarioService.create(payload);

    // aceitar instância do Sequelize ou objeto plain
    const mapped = Funcionario && typeof Funcionario.mapearParaJson === "function"
      ? Funcionario.mapearParaJson(funcionario)
      : (funcionario && typeof funcionario.toJSON === "function" ? funcionario.toJSON() : funcionario);

    const result = sanitizeSenha(mapped);
    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { funcod } = req.params;
    const data = Funcionario && typeof Funcionario.fromJson === "function"
      ? Funcionario.fromJson(req.body)
      : req.body;

    let funcionario = await funcionarioService.update(funcod, data);

    const mapped = Funcionario && typeof Funcionario.mapearParaJson === "function"
      ? Funcionario.mapearParaJson(funcionario)
      : (funcionario && typeof funcionario.toJSON === "function" ? funcionario.toJSON() : funcionario);

    const result = sanitizeSenha(mapped);
    return reply.send(result);
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

    const mapped = Funcionario && typeof Funcionario.mapearParaJson === "function"
      ? Funcionario.mapearParaJson(funcionario)
      : (funcionario && typeof funcionario.toJSON === "function" ? funcionario.toJSON() : funcionario);

    return reply.send(sanitizeSenha(mapped));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const list = async (req, reply) => {
  try {
    const funcionarios = await funcionarioService.list();

    const mapped = Funcionario && typeof Funcionario.mapearParaJson === "function"
      ? Funcionario.mapearParaJson(funcionarios)
      : (Array.isArray(funcionarios)
        ? funcionarios.map((f) => (f && typeof f.toJSON === "function" ? f.toJSON() : f))
        : funcionarios);

    return reply.send(sanitizeSenha(mapped));
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
