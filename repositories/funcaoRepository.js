import models from "../models/modelos.js";
const { Funcao } = models;

const createFuncao = async ({ empresa_id, nome, descricao, ativo = true }) => {
  return Funcao.create({ empresa_id, nome, descricao, ativo });
};

const updateFuncao = async (id, data) => {
  const f = await Funcao.findByPk(id);
  if (!f) return null;
  return f.update(data);
};

const findById = async (id) => {
  return Funcao.findByPk(id);
};

const findAllByEmpresa = async (empresa_id) => {
  return Funcao.findAll({
    where: { empresa_id },
    order: [["id", "ASC"]],
  });
};

const removeFuncao = async (id) => {
  const f = await Funcao.findByPk(id);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default {
  createFuncao,
  updateFuncao,
  findById,
  findAllByEmpresa,
  removeFuncao,
};
