import models from "../models/modelos.js";
const { ProprioSetor } = models;

const create = async (data) => ProprioSetor.create(data);

const update = async (prpfuncod, data) => {
  const p = await ProprioSetor.findByPk(prpfuncod);
  if (!p) return null;
  return p.update(data);
};

const findById = async (prpfuncod) => ProprioSetor.findByPk(prpfuncod);

const findAllByProprio = async (prpcod) => {
  return ProprioSetor.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const remove = async (prpfuncod) => {
  const p = await ProprioSetor.findByPk(prpfuncod);
  if (!p) return null;
  await p.destroy();
  return p;
};

export default { create, update, findById, findAllByProprio, remove };
