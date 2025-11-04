import models from "../models/modelos.js";
const { Vinculo } = models;

const createVinculo = async ({ botao_nome, botao_key, prpcod, fnccod }) => {
  return Vinculo.create({ botao_nome, botao_key, prpcod, fnccod });
};

const updateVinculo = async (id, data) => {
  const v = await Vinculo.findByPk(id);
  if (!v) return null;
  return v.update(data);
};

const findById = async (id) => {
  return Vinculo.findByPk(id);
};

const findAllByProprio = async (prpcod) => {
  return Vinculo.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const findByKey = async (botao_key, prpcod) => {
  return Vinculo.findOne({
    where: { botao_key, prpcod },
  });
};

const removeVinculo = async (id) => {
  const v = await Vinculo.findByPk(id);
  if (!v) return null;
  await v.destroy();
  return v;
};

export default {
  createVinculo,
  updateVinculo,
  findById,
  removeVinculo,
  findAllByProprio,
  findByKey
};
