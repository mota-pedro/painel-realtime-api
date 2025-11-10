import formCamposRepo from "../repositories/formCamposRepository.js";

const create = async ({ prpcod, tipo, nome }) => {
  return formCamposRepo.createFormCampos({ prpcod, tipo, nome });
};

const update = async (id, data) => {
  const updated = await formCamposRepo.updateFormCampos(id, data);
  if (!updated) throw new Error("Campo de formulário não encontrado");
  return updated;
};

const getById = async (id) => {
  return formCamposRepo.findById(id);
};

const listByProprio = async (prpcod) => formCamposRepo.findAllByProprio(prpcod);

const remove = async (id) => {
  const removed = await formCamposRepo.removeFormCampos(id);
  if (!removed) throw new Error("Campo de formulário não encontrado");
  return removed;
};

export default { create, update, getById, remove, listByProprio };
