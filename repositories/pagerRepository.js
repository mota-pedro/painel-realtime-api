import models from "../models/modelos.js";
const { Pager } = models;

const createPager = async ({ nome, key_value, prpcod, numero, cliente, observacao }) => {
  return Pager.create({ nome, key_value, prpcod, numero, cliente, observacao });
};

const updatePager = async (id, data) => {
  const p = await Pager.findByPk(id);
  if (!p) return null;
  return p.update(data);
};

const findById = async (id) => {
  return Pager.findByPk(id);
};

const findAllByProprio = async (prpcod) => {
  return Pager.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const findByNumero = async (numero, prpcod) => {
  return Pager.findOne({
    where: { numero, prpcod },
  });
}

const removePager = async (id) => {
  const p = await Pager.findByPk(id);
  if (!p) return null;
  await p.destroy();
  return p;
};

export default {
  createPager,
  updatePager,
  findById,
  removePager,
  findAllByProprio,
  findByNumero
};
