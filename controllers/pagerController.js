import pagerService from "../services/pagerService.js";
import modelos from "../models/modelos.js";

const { Pager } = modelos;

const mapResult = (obj) => {
  if (!obj) return obj;
  if (Pager && typeof Pager.mapearParaJson === "function") return Pager.mapearParaJson(obj);
  if (Array.isArray(obj)) return obj.map((o) => (o && typeof o.toJSON === "function" ? o.toJSON() : o));
  return obj && typeof obj.toJSON === "function" ? obj.toJSON() : obj;
};

const create = async (req, reply) => {
  try {
    const quantidade = parseInt(req.body.quantidade || 1);
    const basePayload = Pager.fromJson(req.body);

    let created = [];

    if (quantidade > 1) {
      const valorInicial = parseInt(req.body.valor_inicial || 1);
      const valorFinal = valorInicial + quantidade - 1;

      const digits = valorFinal.toString().length;

      for (let i = valorInicial; i <= valorFinal; i++) {
        const numStr = i.toString().padStart(digits, "0");

        const novoPager = {
          ...basePayload,
          nome: `${basePayload.nome} ${numStr}`,
          numero: `${(basePayload.numero || "").trim()}${numStr}`,
        };

        const item = await pagerService.create(novoPager);
        created.push(item);
      }
    } else {
      const item = await pagerService.create(basePayload);
      created.push(item);
    }

    return reply.send(mapResult(created));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = Pager.fromJson(req.body);

    const updated = await pagerService.update(id, data);
    return reply.send(mapResult(updated));
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const getById = async (req, reply) => {
  try {
    const { id } = req.params;
    const p = await pagerService.getById(id);
    if (!p) return reply.status(404).send({ error: "not_found" });
    return reply.send(mapResult(p));
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const listAllByEmpresa = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await pagerService.listByProprio(prpcod);
    return reply.send(mapResult(rows));
  }
  catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const remove = async (req, reply) => {
  try {
    const { id } = req.params;
    await pagerService.remove(id);
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

export default { create, update, getById, listAllByEmpresa, remove };
