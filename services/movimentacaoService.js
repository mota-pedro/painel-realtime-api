import movimentacaoRepo from "../repositories/movimentacaoRepository.js";
import setorRepo from "../repositories/setorRepository.js";
import funcaoRepo from "../repositories/funcaoRepository.js";

const handleIncomingMovimentacao = async (
  { mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod },
  fastify
) => {
  if (!prpcod) throw new Error("prpcod é obrigatório");
  if (!fnccod) throw new Error("fnccod é obrigatório");

  const func = await funcaoRepo.findById(fnccod);
  if (!func) {
    throw new Error("Função (fnccod) não encontrada");
  }

  let setor = null;
  if (setcod) {
    setor = await setorRepo.findById(setcod);
    if (!setor) {
      throw new Error("Setor (setcod) não encontrado");
    }
  }

  const movimentacaoExists = await movimentacaoRepo.findDuplicate({
    fnccod,
    setcod,
    prpcod,
    mpnstt
  });
  if (movimentacaoExists) {
    throw new Error("Movimentação duplicada");
  }

  const saved = await movimentacaoRepo.createMovimentacao({
    mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod
  });

  fastify.emitToEmpresa(prpcod, "movimentacao", {
      id: saved.mpncod, 
      mpndat, 
      mpnhr, 
      mpnstt, 
      mpndatfin, 
      mpnhrfin, 
      mpncodfin, 
      prpcod,
      fnccod: func.fnccod,
      fncdes: func.fncdes,
      fncsetcod: func.setcod,
      fncdis: func.fncdis,
      fncbot: func.fncbot,
      fncbotfec: func.fncbotfec,
      fnctmpexp: func.fnctmpexp,
      fncdigver: func.fncdigver,
      arecod: func.arecod,
      pescod: func.pescod,
      setcod: setor ? setor.setcod : null,
      setdes: setor ? setor.setdes : null,
  });

  return saved;
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
