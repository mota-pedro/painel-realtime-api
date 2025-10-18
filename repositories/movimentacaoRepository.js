import models from "../models/modelos.js";
const { MovimentacaoPainel } = models;

const createMovimentacao = async ({ 
    mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod
}) => {
  return MovimentacaoPainel.create({ mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod });
};

const updateMovimentacao = async (mpncod, data) => {
  const m = await MovimentacaoPainel.findByPk(mpncod);
  if (!m) return null;
  if (m.mpndatfin) {
    throw new Error("Esta movimentação já foi encerrada.");
  }
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
  removeMovimentacao,
  findDuplicate
};
