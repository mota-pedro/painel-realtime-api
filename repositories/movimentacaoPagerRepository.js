import models from "../models/modelos.js";
import { Op } from "sequelize";
const { MovimentacaoPager } = models;

const createMovimentacao = async ({ 
    data, hora, pagerId, ativa, dataFim, horaFim, prpcod
}) => {
  return MovimentacaoPager.create({ data, hora, pagerId, ativa, dataFim, horaFim, prpcod });
};

const updateMovimentacao = async (id, data) => {
  const m = await MovimentacaoPager.findByPk(id);
  if (!m) return null;
  return m.update(data);
};

const findById = async (id) => {
  return MovimentacaoPager.findByPk(id);
};

const findAllByProprio = async (prpcod) => {
  return MovimentacaoPager.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const findAllByProprioWithDate = async (id, data) => {
  return MovimentacaoPager.findAll({
    where: {
      id,
      data: {
        [Op.gte]: data
      }
    },
    order: [["data", "ASC"]],
  });
};

const findAllByPager = async (pagerId) => {
  return MovimentacaoPager.findAll({
    where: {
      pagerId    
    },
  });
};

const removeMovimentacao = async (id) => {
  const m = await MovimentacaoPager.findByPk(id);
  if (!m) return null;
  await m.destroy();
  return m;
};

async function findDuplicate({ pagerId, ativa, prpcod }) {
  return MovimentacaoPager.findOne({
    where: {
      pagerId,
      ativa,
      prpcod,
      dataFim: null,
      horaFim: null
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
  findAllByPager
};
