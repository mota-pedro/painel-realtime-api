import setorRepo from "../repositories/setorRepository.js";

const create = async ({ setdes, setdatcad }) => {
  return setorRepo.createSetor({ setdes, setdatcad });
};

const update = async (setcod, data) => {
  const updated = await setorRepo.updateSetor(setcod, data);
  if (!updated) throw new Error("Setor não encontrado");
  return updated;
};

const getById = async (setcod) => {
  return setorRepo.findById(setcod);
};

const remove = async (setcod) => {
  const removed = await setorRepo.removeSetor(setcod);
  if (!removed) throw new Error("Setor não encontrado");
  return removed;
};

export default { create, update, getById, remove };
