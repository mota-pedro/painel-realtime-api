import funcRepo from "../repositories/funcaoRepository.js";

const create = async ({ fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver, prpcod }) => {
  return funcRepo.createFuncao({ fncdes, fncdis, fncbot, fncdatcad, setcod, arecod, pescod, fnctmpexp, fncbotfec, fncdigver, prpcod });
};

const update = async (fnccod, data) => {
  const updated = await funcRepo.updateFuncao(fnccod, data);
  if (!updated) throw new Error("Função não encontrada");
  return updated;
};

const listBySetor = async (setcod) => {
  const funcoes = await funcRepo.findAllBySetor(setcod);
  if (!funcoes) throw new Error("Nenhuma função encontrada para este setor");
  return funcoes;
};

const listByProprio = async (prpcod) => {
  const funcoes = await funcRepo.findAllByProprio(prpcod);
  if (!funcoes) throw new Error("Nenhuma função encontrada para este proprietário");
  return funcoes;
};

const getById = async (fnccod) => {
  return funcRepo.findById(fnccod);
};

const remove = async (fnccod) => {
  const removed = await funcRepo.removeFuncao(fnccod);
  if (!removed) throw new Error("Função não encontrada");
  return removed;
};

export default { create, update, listBySetor, listByProprio, getById, remove };
