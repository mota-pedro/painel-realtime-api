import empresaRepo from "../repositories/empresaRepository.js";

const create = async ({ nome, telefone, cnpj, ativo = true }) => {
  if (!nome || !telefone || !cnpj)
    throw new Error("nome, telefone e cnpj são obrigatórios");
  return empresaRepo.create({ nome, telefone, cnpj, ativo });
};

const update = async (id, data) => {
  const updated = await empresaRepo.update(id, data);
  if (!updated) throw new Error("Empresa não encontrada");
  return updated;
};

const getById = async (id) => {
  return empresaRepo.findById(id);
};

const list = async () => {
  return empresaRepo.findAll();
};

const remove = async (id) => {
  const removed = await empresaRepo.remove(id);
  if (!removed) throw new Error("Empresa não encontrada");
  return removed;
};

export default { create, update, getById, list, remove };
