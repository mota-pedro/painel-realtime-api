import movimentacaoRepo from "../repositories/movimentacaoRepository.js";

const handleIncomingMovimentacao = async (
  { mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod },
  fastify
) => {
  const saved = await movimentacaoRepo.createMovimentacao({
    mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod
  });
  if (!prpcod) throw new Error("prpcod é obrigatório");

  fastify.emitToEmpresa(prpcod, "movimentacao", {
      id: saved.mpncod, 
      mpndat, 
      mpnhr, 
      fnccod, 
      mpnstt, 
      mpndatfin, 
      mpnhrfin, 
      mpncodfin, 
      setcod, 
      prpcod
  });

  return movimentacaoRepo.createMovimentacao({ mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod });
}

const update = async (mpncod, data) => {
  const updated = await movimentacaoRepo.updateMovimentacao(mpncod, data);
  if (!updated) throw new Error("Movimentação não encontrada");
  return updated;
};

const listByProprio = async (prpcod) => {
  return movimentacaoRepo.findAllByProprio(prpcod);
};

const getById = async (mpncod) => {
  return movimentacaoRepo.findById(mpncod);
};

const remove = async (mpncod) => {
  const removed = await movimentacaoRepo.removeMovimentacao(mpncod);
  if (!removed) throw new Error("Movimentação não encontrada");
  return removed;
};

export default { handleIncomingMovimentacao, update, listByProprio, getById, remove };
