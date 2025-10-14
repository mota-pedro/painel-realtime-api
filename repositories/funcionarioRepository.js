import models from "../models/modelos.js";
const { Funcionario } = models;

const create = async (data) => Funcionario.create(data);

const update = async (funcod, data) => {
  const f = await Funcionario.findByPk(funcod);
  if (!f) return null;
  return f.update(data);
};

const findById = async (funcod) => Funcionario.findByPk(funcod);

const findAll = async () =>
  Funcionario.findAll({ order: [["FUNDATCAD", "DESC"]] });

const remove = async (funcod) => {
  const f = await Funcionario.findByPk(funcod);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default { create, update, findById, findAll, remove };
