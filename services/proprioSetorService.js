import proprioSetorRepo from "../repositories/proprioSetorRepository.js";

const create = async ({ prpcod, setcod }) => {
  return proprioSetorRepo.create({ prpcod, setcod });
};

const update = async (prpsetcod, data) => {
  const updated = await proprioSetorRepo.update(prpsetcod, data);
  if (!updated) throw new Error("Correlação próprio-setor não encontrada");
  return updated;
};

const listByProprio = async (prpcod) => {
  const proprioSetor = await proprioSetorRepo.findAllByProprio(prpcod);
  if (!proprioSetor) throw new Error("Nenhuma correlação próprio-setor encontrada para este próprio");
  return proprioSetor;
};

const getById = async (prpsetcod) => {
  return proprioSetorRepo.findById(prpsetcod);
};

const remove = async (prpsetcod) => {
  const removed = await proprioSetorRepo.remove(prpsetcod);
  if (!removed) throw new Error("Correlação próprio-setor não encontrada");
  return removed;
};

export default { create, update, listByProprio, getById, remove };
