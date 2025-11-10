import models from "../models/modelos.js";
const { MovimentacaoPagerCampos } = models;

const createMovimentacaoForm = async ({ formCampoId, movPagerId, valor }) => {
  return MovimentacaoPagerCampos.create({ formCampoId, movPagerId, valor });
};

const updateMovimentacaoForm = async (id, data) => {
  const f = await MovimentacaoPagerCampos.findByPk(id);
  if (!f) return null;
  return f.update(data);
};

const findById = async (id) => {
  return MovimentacaoPagerCampos.findByPk(id);
};

const findAllByMovId= async (movPagerId) => {
  return MovimentacaoPagerCampos.findAll({
    where: { movPagerId },
    order: [["formCampoId", "ASC"]],
  });
};

const removeMovimentacaoForm = async (id) => {
  const f = await MovimentacaoPagerCampos.findByPk(id);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default {
  createMovimentacaoForm,
  updateMovimentacaoForm,
  findById,
  removeMovimentacaoForm,
  findAllByMovId
};
