import movimentacaoFormRepo from "../repositories/movimentacaoFormRepository.js";

const create = async ({ formCampoId, movPagerId, valor }) => {
  const existente = await movimentacaoFormRepo.findByCampoAndMov({
    formCampoId,
    movPagerId,
  });

  if (existente) {
    if (existente.valor !== valor) {
      return movimentacaoFormRepo.updateMovimentacaoForm(existente.id, { valor });
    }

    return existente;
  }

  return movimentacaoFormRepo.createMovimentacaoForm({ formCampoId, movPagerId, valor });
};

const update = async (id, data) => {
  const updated = await movimentacaoFormRepo.updateMovimentacaoForm(id, data);
  if (!updated) throw new Error("movimentacaoPagerCampo não encontrado");
  return updated;
};

const getById = async (id) => {
  return movimentacaoFormRepo.findById(id);
};

const listByMovId = async (movPagerId) => movimentacaoFormRepo.findAllByMovId(movPagerId);

const remove = async (id) => {
  const removed = await movimentacaoFormRepo.removeMovimentacaoForm(id);
  if (!removed) throw new Error("movimentacaoPagerCampo não encontrado");
  return removed;
};

export default { create, update, getById, remove, listByMovId };
