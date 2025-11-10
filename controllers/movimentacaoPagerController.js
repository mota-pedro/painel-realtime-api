import movimentacaoPagerService from "../services/movimentacaoPagerService.js";
import modelos from "../models/modelos.js";
import formCamposService from "../services/formCamposService.js";
import movimentacaoFormService from "../services/movimentacaoFormService.js";

const { MovimentacaoPager } = modelos;

const create = async (req, reply) => {
  try {
    console.log("REQ BODY:", req.body);

    // Converter JSON recebido
    const payload = MovimentacaoPager.fromJson(req.body);

    // Criar movimentação
    const created = await movimentacaoPagerService.handleIncomingMovimentacao(
      payload,
      req.server
    );

    const result = MovimentacaoPager.mapearParaJson(created);

    // Garantir que existe prpcod
    if (!result.empresaId) {
      return reply.send(result);
    }

    // Buscar campos registrados da empresa
    const formCampos = await formCamposService.listByProprio(result.empresaId);
    if (formCampos.length === 0) {
      result.campos = [];
      return reply.send(result);
    }

    // Buscar valores recém-criados dos campos dinâmicos
    const valoresMov = await movimentacaoFormService.listByMovId(result.id);

    // Mapa campoId → valor
    const mapaValores = {};
    for (const item of valoresMov) {
      mapaValores[item.formCampoId] = item.valor;
    }

    // Montar resposta final
    result.campos = formCampos.map(fc => {
      const campoJson = modelos.FormCampos.mapearParaJson(fc);
      const valor = mapaValores[fc.id];

      if (valor !== undefined && valor !== null) {
        campoJson.valor = valor;
      }

      return campoJson;
    });

    return reply.send(result);

  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};


const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = MovimentacaoPager.fromJson(req.body);

    const updated = await movimentacaoPagerService.handleUpdateMovimentacao(id, data, req.server);

    const result = MovimentacaoPager.mapearParaJson(updated);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const { date } = req.query;

    const rows = date
      ? await movimentacaoPagerService.listByProprioWithDate(prpcod, date)
      : await movimentacaoPagerService.listByProprio(prpcod);

    const movimentacoes = MovimentacaoPager.mapearParaJson(rows);

    const formCampos = await formCamposService.listByProprio(prpcod);
    if (formCampos.length === 0) {
      return reply.send(movimentacoes);
    }

    // Todos os IDs de movimentação
    const movIds = movimentacoes.map(m => m.id);

    // Todos os valores encontrados no banco
    const movPagerCampos = await movimentacaoFormService.listByMovId(movIds);

    // Criar mapa: movId → [{ formCampoId, valor }]
    const valoresPorMov = {};
    for (const item of movPagerCampos) {
      if (!valoresPorMov[item.movPagerId]) {
        valoresPorMov[item.movPagerId] = {};
      }
      valoresPorMov[item.movPagerId][item.formCampoId] = item.valor;
    }

    // Montar resposta
    const resultado = movimentacoes.map(mov => ({
      ...mov,
      campos: formCampos.map(fc => {
        const jsonCampo = modelos.FormCampos.mapearParaJson(fc);
        const valor = valoresPorMov[mov.id]?.[fc.id];

        if (valor !== undefined && valor !== null) {
          jsonCampo.valor = valor;
        }

        return jsonCampo;
      })
    }));

    return reply.send(resultado);

  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};


const getById = async (req, reply) => {
  try {
    const { id } = req.params;

    // Buscar movimentação
    const m = await movimentacaoPagerService.getById(id);
    if (!m) {
      return reply.status(404).send({ error: "not_found" });
    }

    const result = MovimentacaoPager.mapearParaJson(m);

    // Buscar campos configurados do proprietário da movimentação
    const formCampos = await formCamposService.listByProprio(result.prpcod);
    if (formCampos.length === 0) {
      result.campos = [];
      return reply.send(result);
    }

    // Buscar valores dos campos dessa movimentação
    const valoresMov = await movimentacaoFormService.listByMovId(result.id);

    // Mapear valores por campoId => valor
    const mapaValores = {};
    for (const item of valoresMov) {
      mapaValores[item.formCampoId] = item.valor;
    }

    // Montar JSON final dos campos
    result.campos = formCampos.map(fc => {
      const campoJson = modelos.FormCampos.mapearParaJson(fc);

      const valor = mapaValores[fc.id];
      if (valor !== undefined && valor !== null) {
        campoJson.valor = valor;
      }

      return campoJson;
    });

    return reply.send(result);

  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getByPagerId = async (req, reply) => {
  try {
    const { pagerId } = req.params;

    // Buscar movimentação mais recente pelo pagerId
    const m = await movimentacaoPagerService.getByPagerId(pagerId);
    if (!m) {
      return reply.status(404).send({ error: "not_found" });
    }

    const result = MovimentacaoPager.mapearParaJson(m);

    // Validar se tem prpcod na movimentação (empresa)
    if (!result.prpcod) {
      return reply.send(result); // Não tem como buscar campos sem empresa
    }

    // Buscar campos configurados do proprietário (empresa)
    const formCampos = await formCamposService.listByProprio(result.prpcod);

    if (formCampos.length === 0) {
      result.campos = [];
      return reply.send(result);
    }

    // Buscar valores dos campos dessa movimentação
    const valoresMov = await movimentacaoFormService.listByMovId(result.id);

    // Criar mapa: campoId -> valor
    const mapaValores = {};
    for (const item of valoresMov) {
      mapaValores[item.formCampoId] = item.valor;
    }

    // Montar lista de campos (com valor quando existir)
    result.campos = formCampos.map(fc => {
      const campoJson = modelos.FormCampos.mapearParaJson(fc);

      const valor = mapaValores[fc.id];
      if (valor !== undefined && valor !== null) {
        campoJson.valor = valor;
      }

      return campoJson;
    });

    return reply.send(result);

  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const updateChamando = async (req, reply) => {
  try {
    const { id } = req.params;
    const updated = await movimentacaoPagerService.addChamadoCount(id);
    const result = MovimentacaoPager.mapearParaJson(updated);
    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await movimentacaoPagerService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listByProprio, updateChamando, getById, getByPagerId, remove };
