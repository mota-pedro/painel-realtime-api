import models from "../models/modelos.js";
const { Usuario } = models;

const create = async (data) => Usuario.create(data);

const update = async (id, data) => {
  const u = await Usuario.findByPk(id);
  if (!u) return null;
  return u.update(data);
};

const findById = async (id) => Usuario.findByPk(id);

const findAll = async () =>
  Usuario.findAll({ order: [["created_at", "DESC"]] });

const remove = async (id) => {
  const u = await Usuario.findByPk(id);
  if (!u) return null;
  await u.destroy();
  return u;
};

export default { create, update, findById, findAll, remove };
