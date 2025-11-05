import models from "../models/modelos.js";
import { Op } from "sequelize";
const { MovimentacaoPainel } = models;

const createMovimentacao = async ({ 
    mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod
}) => {
  return MovimentacaoPainel.create({ mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod });
};

const updateMovimentacao = async (mpncod, data) => {
  const m = await MovimentacaoPainel.findByPk(mpncod);
  if (!m) return null;
  return m.update(data);
};

const findById = async (mpncod) => {
  return MovimentacaoPainel.findByPk(mpncod);
};

const findAllByProprio = async (prpcod) => {
  return MovimentacaoPainel.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const findAllByProprioWithDate = async (prpcod, mpndat) => {
  return MovimentacaoPainel.findAll({
    where: {
      prpcod,
      mpndat: {
        [Op.gte]: mpndat
      }
    },
    order: [["MPNDAT", "ASC"]],
  });
};

const findAllBySetor = async (setcod) => {
  return MovimentacaoPainel.findAll({
    where: {
      setcod,
      mpnstt: 'A',
    },
  });
};

const removeMovimentacao = async (mpncod) => {
  const m = await MovimentacaoPainel.findByPk(mpncod);
  if (!m) return null;
  await m.destroy();
  return m;
};

async function findDuplicate({ fnccod, setcod, prpcod, mpnstt }) {
  return MovimentacaoPainel.findOne({
    where: {
      fnccod,
      prpcod,
      setcod,
      mpnstt,
      mpndatfin: null,
      mpnhrfin: null
    }
  });
}

export default {
  createMovimentacao,
  updateMovimentacao,
  findById,
  findAllByProprio,
  findAllByProprioWithDate,
  removeMovimentacao,
  findDuplicate,
  findAllBySetor
};
