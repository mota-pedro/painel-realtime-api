import movimentacaoPagerService from "../services/movimentacaoPagerService.js";
import modelos from "../models/modelos.js";

const { MovimentacaoPager } = modelos;

const create = async (req, reply) => {
  try {
    console.log("REQ BODY:", req.body);
    const payload = MovimentacaoPager.fromJson(req.body);

    const created = await movimentacaoPagerService.handleIncomingMovimentacao(payload, req.server);

    const result = MovimentacaoPager.mapearParaJson(created);

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

    let rows;
    let result;
    if (date) {
      rows = await movimentacaoPagerService.listByProprioWithDate(prpcod, date);
      result = rows;
    } else {
      rows = await movimentacaoPagerService.listByProprio(prpcod);
      result = MovimentacaoPager.mapearParaJson(rows);
    }

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const m = await movimentacaoPagerService.getById(id);
    if (!m) return reply.status(404).send({ error: "not_found" });

    const result = MovimentacaoPager.mapearParaJson(m);

    return reply.send(result);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
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

export default { create, update, listByProprio, getById, remove };
