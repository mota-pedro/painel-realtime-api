import models from "../models/modelos.js";
const { ProprioFuncionario } = models;

const create = async (data) => ProprioFuncionario.create(data);

const update = async (prpfuncod, data) => {
  const p = await ProprioFuncionario.findByPk(prpfuncod);
  if (!p) return null;
  return p.update(data);
};

const findById = async (prpfuncod) => ProprioFuncionario.findByPk(prpfuncod);

const findAllByProprio = async (prpcod) => {
  return ProprioFuncionario.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const findAllByFuncionario = async (funcod) => {
  return ProprioFuncionario.findAll({
    where: { funcod },
    order: [["FUNCOD", "ASC"]],
  });
};

const findByProprioAndFuncionario = async (prpcod, funcod) => {
  return ProprioFuncionario.findOne({
    where: { funcod, prpcod },
    order: [["PRPFUNCOD", "ASC"]],
  });
};

const remove = async (prpfuncod) => {
  const p = await ProprioFuncionario.findByPk(prpfuncod);
  if (!p) return null;
  await p.destroy();
  return p;
};

export default { create, update, findById, findAllByFuncionario, findAllByProprio, findByProprioAndFuncionario, remove };
