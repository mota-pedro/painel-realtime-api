import models from "../models/modelos.js";
const { Proprio } = models;

const create = async (data) => Proprio.create(data);
const update = async (prpcod, data) => {
  const p = await Proprio.findByPk(prpcod);
  if (!p) return null;
  return p.update(data);
};
const findById = async (prpcod) => Proprio.findByPk(prpcod);
const findAll = async () =>
  Proprio.findAll({ order: [["PRPDATCAD", "DESC"]] });
const remove = async (prpcod) => {
  const p = await Proprio.findByPk(prpcod);
  if (!p) return null;
  await p.destroy();
  return p;
};

export default { create, update, findById, findAll, remove };
