import funcRepo from "../repositories/funcaoRepository.js";

const create = async ({ empresa_id, nome, descricao, ativo }) => {
  if (!empresa_id || !nome)
    throw new Error("empresa_id e nome são obrigatórios");
  return funcRepo.createFuncao({ empresa_id, nome, descricao, ativo });
};

const update = async (id, data) => {
  const updated = await funcRepo.updateFuncao(id, data);
  if (!updated) throw new Error("Funcao não encontrada");
  return updated;
};

const listByEmpresa = async (empresa_id) => {
  return funcRepo.findAllByEmpresa(empresa_id);
};

const getById = async (id) => {
  return funcRepo.findById(id);
};

const remove = async (id) => {
  const removed = await funcRepo.removeFuncao(id);
  if (!removed) throw new Error("Funcao não encontrada");
  return removed;
};

export default { create, update, listByEmpresa, getById, remove };
