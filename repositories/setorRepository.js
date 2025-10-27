import models from "../models/modelos.js";
const { Setor } = models;

const createSetor = async ({ setdes, setdatcad, prpcod }) => {
  return Setor.create({ setdes, setdatcad, prpcod });
};

const updateSetor = async (setcod, data) => {
  const f = await Setor.findByPk(setcod);
  if (!f) return null;
  return f.update(data);
};

const findById = async (setcod) => {
  return Setor.findByPk(setcod);
};

const findAllByProprio = async (prpcod) => {
  return Setor.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const removeSetor = async (setcod) => {
  const f = await Setor.findByPk(setcod);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default {
  createSetor,
  updateSetor,
  findById,
  removeSetor,
  findAllByProprio
};
