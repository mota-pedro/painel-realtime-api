import movimentacaoService from "../services/movimentacaoService.js";

const create = async (req, reply) => {
  try {
    const { 
        mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod 
    } = req.body;
    const created = await movimentacaoService.handleIncomingMovimentacao(
      {mpndat, mpnhr, fnccod, mpnstt, mpndatfin, mpnhrfin, mpncodfin, setcod, prpcod},
      req.server
    );
    return reply.send({
      mpncod: created.mpncod, 
      mpndat: created.mpndat, 
      mpnhr: created.mpnhr, 
      fnccod: created.fnccod, 
      mpnstt: created.mpnstt, 
      mpndatfin: created.mpndatfin, 
      mpnhrfin: created.mpnhrfin, 
      mpncodfin: created.mpncodfin, 
      setcod: created.setcod, 
      prpcod: created.prpcod 
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const update = async (req, reply) => {
  try {
    const { mpncod } = req.params;
    const data = req.body;
    const updated = await movimentacaoService.update(mpncod, data);
    return reply.send(updated);
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const listByProprio = async (req, reply) => {
  try {
    const { prpcod } = req.params;
    const rows = await movimentacaoService.listByProprio(prpcod);
    return reply.send(rows);
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
    return reply.send(m);
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
