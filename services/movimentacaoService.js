import movimentacaoRepo from "../repositories/movimentacaoRepository.js";
import setorRepo from "../repositories/setorRepository.js";
import funcaoRepo from "../repositories/funcaoRepository.js";

const handleIncomingMovimentacao = async (
  { mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, prpcod },
  fastify
) => {
  if (!prpcod) throw new Error("prpcod é obrigatório");
  if (!fnccod) throw new Error("fnccod é obrigatório");

  const func = await funcaoRepo.findById(fnccod);
  if (!func) throw new Error("Função (fnccod) não encontrada");

  const setor = await setorRepo.findById(func.setcod);
  if (!setor) throw new Error("Setor (setcod) não encontrado");

  if (func.fncbotfec === 'N') {
    const existeAberta = await movimentacaoRepo.findDuplicate({
      fnccod,
      setcod: setor.setcod,
      prpcod,
      mpnstt: 'A',
    });

    if (existeAberta) {
      throw new Error("Já existe uma movimentação aberta para esta função ou painel");
    }

    const saved = await movimentacaoRepo.createMovimentacao({
      mpndat,
      mpnhr,
      fnccod,
      mpnstt,
      mpndatfin: null,
      mpnhrfin: null,
      mpncodfin: null,
      setcod: setor.setcod,
      prpcod,
    });

    fastify.emitToEmpresa(prpcod, "movimentacao_aberta", {
      id: saved.mpncod,
      mpndat,
      mpnhr,
      mpnstt,
      prpcod,
      fnccod: func.fnccod,
      fncdes: func.fncdes,
      fncdis: func.fncdis,
      fncbot: func.fncbot,
      fncbotfec: func.fncbotfec,
      fnctmpexp: func.fnctmpexp,
      fncdigver: func.fncdigver,
      arecod: func.arecod,
      pescod: func.pescod,
      setcod: setor.setcod,
      setdes: setor.setdes,
    });

    return saved;
  }

  if (func.fncbotfec === 'S') {
    const movimentacoesAbertas = await movimentacaoRepo.findAllBySetor(setor.setcod);
    const formattedDate = (mpndatfin || new Date()).toISOString().split('T')[0]
    const formattedTime = (mpnhrfin || new Date()).toTimeString().split(' ')[0];

    const saved = await movimentacaoRepo.createMovimentacao({
      mpndat,
      mpnhr,
      fnccod,
      mpnstt: "F",
      mpndatfin: formattedDate,
      mpnhrfin: formattedTime,
      setcod: setor.setcod,
      prpcod,
    });

    const updatedMovimentacoes = [];
    for (const movimentacao of movimentacoesAbertas) {
      const updated = await movimentacaoRepo.updateMovimentacao(movimentacao.mpncod, {
        mpndatfin: formattedDate,
        mpnhrfin: formattedTime,
        mpnstt: 'F',
        mpncodfin: saved.mpncod,
      });
      updatedMovimentacoes.push(updated);
    }

    console.log("MOVIMENTACOES ATUALIZADAS: ", JSON.stringify(updatedMovimentacoes));

    fastify.emitToEmpresa(prpcod, "movimentacao_fechada", {
      movimentacoes: updatedMovimentacoes.map(m => ({
        id: m.mpncod,
        mpndatfin: m.mpndatfin,
        mpnhrfin: m.mpnhrfin,
      }))
    });

    const updatedFechamento = await movimentacaoRepo.updateMovimentacao(saved.mpncod, {
      mpncodfin: saved.mpncod
    })

    return updatedFechamento;
  }

  throw new Error("Erro ao processar chamado");
};

const handleUpdateMovimentacao = async (mpncod, data, fastify) => {
  const { mpnstt, mpndatfin, mpnhrfin } = data;

  const updated = await movimentacaoRepo.updateMovimentacao(mpncod, {
    mpnstt,
    mpndatfin,
    mpnhrfin
  });

  if (mpnstt === 'F') {
    fastify.emitToEmpresa(data.prpcod, "movimentacao_fechada", {
      movimentacoes: [{
        id: updated.mpncod,
        mpndatfin: updated.mpndatfin,
        mpnhrfin: updated.mpnhrfin,
      }]
    });
  }

  if (!updated) throw new Error("Movimentação não encontrada");
  return updated;
};

const listByProprio = async (prpcod) => movimentacaoRepo.findAllByProprio(prpcod);

const listByProprioWithDate = async (prpcod, mpndat) => {
  return await movimentacaoRepo.findAllByProprioWithDate(prpcod, mpndat);
};

const getById = async (mpncod) => movimentacaoRepo.findById(mpncod);

const remove = async (mpncod) => {
  const removed = await movimentacaoRepo.removeMovimentacao(mpncod);
  if (!removed) throw new Error("Movimentação não encontrada");
  return removed;
};

export default { handleIncomingMovimentacao, handleUpdateMovimentacao, listByProprio, listByProprioWithDate, getById, remove };
