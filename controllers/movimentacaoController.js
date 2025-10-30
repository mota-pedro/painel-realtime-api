import movimentacaoService from "../services/movimentacaoService.js";
import modelos from "../models/modelos.js";

const { MovimentacaoPainel } = modelos;

const create = async (req, reply) => {
  try {
    console.log("REQ BODY:", req.body);
    const payload = MovimentacaoPainel.fromJson(req.body);

    const created = await movimentacaoService.handleIncomingMovimentacao(payload, req.server);

    const result = MovimentacaoPainel.mapearParaJson(created);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { mpncod } = req.params;
    const data = MovimentacaoPainel.fromJson(req.body);

    const updated = await movimentacaoService.handleUpdateMovimentacao(mpncod, data, req.server);

    const result = MovimentacaoPainel.mapearParaJson(updated);

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

    let rows;
    let result;
    if (date) {
      rows = await movimentacaoService.listByProprioWithDate(prpcod, date);
      result = rows;
    } else {
      rows = await movimentacaoService.listByProprio(prpcod);
      result = MovimentacaoPainel.mapearParaJson(rows);
    }

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { mpncod } = req.params;
    const m = await movimentacaoService.getById(mpncod);
    if (!m) return reply.status(404).send({ error: "not_found" });

    const result = MovimentacaoPainel.mapearParaJson(m);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { mpncod } = req.params;
    await movimentacaoService.remove(mpncod);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, listByProprio, getById, remove };
