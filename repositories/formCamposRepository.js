import models from "../models/modelos.js";
const { FormCampos } = models;

const createFormCampos = async ({ prpcod, tipo, nome }) => {
  return FormCampos.create({ prpcod, tipo, nome });
};

const updateFormCampos = async (id, data) => {
  const f = await FormCampos.findByPk(id);
  if (!f) return null;
  return f.update(data);
};

const findById = async (id) => {
  return FormCampos.findByPk(id);
};

const findAllByProprio = async (prpcod) => {
  return FormCampos.findAll({
    where: { prpcod },
    order: [["PRPCOD", "ASC"]],
  });
};

const removeFormCampos = async (id) => {
  const f = await FormCampos.findByPk(id);
  if (!f) return null;
  await f.destroy();
  return f;
};

export default {
  createFormCampos,
  updateFormCampos,
  findById,
  removeFormCampos,
  findAllByProprio
};
