import models from "../models/modelos.js";
const { Empresa } = models;

const create = async (data) => Empresa.create(data);
const update = async (id, data) => {
  const e = await Empresa.findByPk(id);
  if (!e) return null;
  return e.update(data);
};
const findById = async (id) => Empresa.findByPk(id);
const findAll = async () =>
  Empresa.findAll({ order: [["created_at", "DESC"]] });
const remove = async (id) => {
  const e = await Empresa.findByPk(id);
  if (!e) return null;
  await e.destroy();
  return e;
};

export default { create, update, findById, findAll, remove };
