import pagerRepo from "../repositories/pagerRepository.js";

const create = async ({ nome, key_value, prpcod, numero, cliente, observacao }) => {
    const existing = await pagerRepo.findByNumero(numero, prpcod);
    if (existing) {
        throw new Error("Já existe um pager com este numero para esta empresa.");
    }
    return pagerRepo.createPager({ nome, key_value, prpcod, numero, cliente, observacao });
};

const update = async (id, data) => {
  const updated = await pagerRepo.updatePager(id, data);
  if (!updated) throw new Error("Pager não encontrado");
  return updated;
};

const getById = async (id) => {
  return pagerRepo.findById(id);
};

const listByProprio = async (prpcod) => pagerRepo.findAllByProprio(prpcod);

const remove = async (id) => {
  const removed = await pagerRepo.removePager(id);
  if (!removed) throw new Error("Pager não encontrado");
  return removed;
};

export default { create, update, getById, remove, listByProprio };
