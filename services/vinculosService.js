import vinculosRepo from "../repositories/vinculosRepository.js";

const create = async ({ botao_nome, botao_key, prpcod, fnccod }) => {
    const existing = await vinculosRepo.findByKey(botao_key, prpcod);
    if (existing) throw new Error("Este vínculo já existe.");
    return vinculosRepo.createVinculo({ botao_nome, botao_key, prpcod, fnccod });
};

const update = async (id, data) => {
  const updated = await vinculosRepo.updateVinculo(id, data);
  if (!updated) throw new Error("Vinculo não encontrado");
  return updated;
};

const getById = async (id) => {
  return vinculosRepo.findById(id);
};

const listByProprio = async (prpcod) => vinculosRepo.findAllByProprio(prpcod);

const remove = async (id) => {
  const removed = await vinculosRepo.removeVinculo(id);
  if (!removed) throw new Error("Vinculo não encontrado");
  return removed;
};

export default { create, update, getById, remove, listByProprio };
