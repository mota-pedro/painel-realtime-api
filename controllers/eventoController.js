import eventoService from "../services/eventoService.js";
import { findLatestByEmpresa } from "../repositories/eventoRepository.js";

const receiveEvento = async (req, reply) => {
  try {
    const {
      empresa_id,
      usuario_id,
      funcao_id,
      dispositivo_id,
      nome,
      descricao,
    } = req.body;

    if (!empresa_id || !funcao_id || !nome) {
      return reply
        .status(400)
        .send({ error: "Parâmetros obrigatórios ausentes" });
    }

    const saved = await eventoService.handleIncomingEvent(
      { empresa_id, usuario_id, funcao_id, nome, descricao, dispositivo_id },
      req.server
    );

    return reply.send({
      id: saved.id,
      empresa_id: saved.empresa_id,
      usuario_id: saved.usuario_id,
      funcao_id: saved.funcao_id,
      nome: saved.nome,
      descricao: saved.descricao,
      dispositivo_id: saved.dispositivo_id,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

const getLatestForEmpresa = async (req, reply) => {
  try {
    const { empresa_id } = req.params;
    const rows = await findLatestByEmpresa(empresa_id, 50);
    return reply.send(rows);
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

export default { receiveEvento, getLatestForEmpresa };
