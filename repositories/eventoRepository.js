import models from "../models/modelos.js";
const { Evento } = models;

export const createEvento = async ({
  empresa_id,
  usuario_id,
  funcao_id,
  nome,
  descricao,
  dispositivo_id,
}) => {
  return Evento.create({
    empresa_id,
    usuario_id,
    funcao_id,
    nome,
    descricao,
    dispositivo_id,
  });
};

export const findLatestByEmpresa = async (empresa_id, limit = 50) => {
  return Evento.findAll({
    where: { empresa_id },
    order: [["createdAt", "DESC"]],
    limit,
  });
};
