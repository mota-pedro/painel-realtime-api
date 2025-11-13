import movimentacaoPagerRepo from "../repositories/movimentacaoPagerRepository.js";
import pagerRepo from "../repositories/pagerRepository.js";

const handleIncomingMovimentacao = async (
  { data, hora, pagerId, dataFim, horaFim, prpcod, qtdChamados },
  fastify
) => {
    try {
        if (!prpcod) throw new Error("empresaId (prpcod) é obrigatório");
        if (!pagerId) throw new Error("pagerId é obrigatório");

        const pager = await pagerRepo.findById(pagerId);
        if (!pager) throw new Error(`Pager com id ${pagerId} não encontrado`);

        const existeAberta = await movimentacaoPagerRepo.findDuplicate({
            pagerId,
            ativa: true,
            prpcod,
        });

        if (existeAberta) {
        throw new Error("Já existe uma movimentação aberta para este pager");
        }

        const saved = await movimentacaoPagerRepo.createMovimentacao({
            data, hora, pagerId, ativa: true, dataFim, horaFim, prpcod, qtdChamados
        });

        if (!saved) throw new Error("Erro ao abrir movimentação pager");

        fastify.emitDigitalCall(prpcod, "movimentacao_pager_aberta", {
          id: saved.id,
          data,
          hora,
          ativa: true,
          empresaId: prpcod,
          pagerId,
          qtdChamados
        });

        return saved;
    } catch (error) {
        throw new Error("Erro ao processar chamado");
    }
};

const handleUpdateMovimentacao = async (id, data, fastify) => {
  try {
    const { ativa, dataFim, horaFim } = data;

    const updated = await movimentacaoPagerRepo.updateMovimentacao(id, {
        ativa,
        dataFim,
        horaFim
    });

    if (!updated) throw new Error("Movimentação não encontrada");

    if (updated.ativa === false) {
        fastify.emitDigitalCall(updated.prpcod, "movimentacao_pager_fechada", {
            id: updated.id,
            data: updated.data,
            hora: updated.hora,
            ativa: updated.ativa,
            dataFim: updated.dataFim,
            horaFim: updated.horaFim,
            empresaId: updated.prpcod,
            pagerId: updated.pagerId,
            qtdChamados: updated.qtdChamados
        });
    }

    return updated;
  } catch (error) {
    throw new Error("Erro ao processar chamado: " + error.message);
  }
};

const handleChamado = async (pagerId, fastify, prpcod) => {
    const pager = await pagerRepo.findById(pagerId);
    if (!pager) throw new Error(`Pager com id ${pagerId} não encontrado`);

    fastify.emitDigitalCall(prpcod, "chamando_pager", {
      numero: pager.numero,
      key_value: pager.key_value
    });

    return pager;
}


const addChamadoCount = async (id) => {
    const movimentacao = await movimentacaoPagerRepo.findById(id);
    if (!movimentacao) throw new Error("Movimentação não encontrada");
    const newCount = (movimentacao.qtdChamados || 0) + 1;
    const updated = await movimentacaoPagerRepo.updateMovimentacao(id, {
        qtdChamados: newCount
    });
    return updated;
}

const listByProprio = async (prpcod) => movimentacaoPagerRepo.findAllByProprio(prpcod);

const listByProprioWithDate = async (prpcod, data) => {
    /*

    PRECISAM SER IMPLEMENTADO ANTES OS REPOSITORIES DE FORM_CAMPOS E MOVIMENTACAO_PAGER_CAMPOS

  const response = [];
  const movimentacoes = await movimentacaoPagerRepo.findAllByProprioWithDate(prpcod, data);
  for (const m of movimentacoes) {
    const func = await pagerRepo.findById(m.fnccod);
    const setor = await setorRepo.findById(m.setcod);
    response.push({
      id: m.mpncod,
      mpndat: m.mpndat,
      mpnhr: m.mpnhr,
      mpndatfin: m.mpndatfin,
      mpnhrfin: m.mpnhrfin,
      mpnstt: m.mpnstt,
      prpcod: m.prpcod,
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

  }
  return response;
  */
};

const getById = async (id) => movimentacaoPagerRepo.findById(id);

const getByPagerId = async (pagerId) => movimentacaoPagerRepo.findByPagerId(pagerId);

const remove = async (id) => {
  const removed = await movimentacaoPagerRepo.removeMovimentacao(id);
  if (!removed) throw new Error("Movimentação não encontrada");
  return removed;
};

export default { handleIncomingMovimentacao, handleUpdateMovimentacao, addChamadoCount, handleChamado, listByProprio, listByProprioWithDate, getById, getByPagerId, remove };
