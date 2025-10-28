import models from "../models/modelos.js";
const { Funcao, Setor } = models;

const createFuncao = async ({ 
  fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver, prpcod
}) => {
  return Funcao.create({ fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver, prpcod });
};

const updateFuncao = async (fnccod, data) => {
  const f = await Funcao.findByPk(fnccod);
  if (!f) return null;
  return f.update(data);
};

const findById = async (fnccod) => {
  return Funcao.findByPk(fnccod);
};

const findAllBySetor = async (setcod) => {
  return Funcao.findAll({
    where: { setcod },
    order: [["SETCOD", "ASC"]],
  });
};

const findAllByProprio = async (prpcod) => {
  return Funcao.findAll({
    where: { prpcod },
    include: [
      {
        model: Setor,
        as: "setores",
        attributes: ["setdes"],
      },
    ],
    order: [["PRPCOD", "ASC"]],
  });
};

const removeFuncao = async (fnccod) => {
  const f = await Funcao.findByPk(fnccod);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default {
  createFuncao,
  updateFuncao,
  findById,
  findAllBySetor,
  removeFuncao,
  findAllByProprio
};
