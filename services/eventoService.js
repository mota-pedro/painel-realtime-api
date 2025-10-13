import { createEvento } from "../repositories/eventoRepository.js";

const handleIncomingEvent = async (
  { empresa_id, usuario_id, funcao_id, nome, descricao, dispositivo_id },
  fastify
) => {
  // persist
  const saved = await createEvento({
    empresa_id,
    usuario_id,
    funcao_id,
    nome,
    descricao,
    dispositivo_id,
  });

  fastify.emitToEmpresa(empresa_id, "evento", {
    id: saved.id,
    empresa_id,
    usuario_id,
    funcao_id,
    nome,
    descricao,
    dispositivo_id,
    createdAt: saved.createdAt,
  });

  return saved;
};

export default { handleIncomingEvent };
