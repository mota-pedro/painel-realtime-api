import proprioRepo from "../repositories/proprioRepository.js";

const create = async ({ 
  prpdes, 
  prpfan, 
  prpcgc, 
  prpierg,
  prpincmun,
  prpend,
  prpcmp,
  prpnum,
  prpbai,
  prpmun,
  prpuf,
  prpcep,
  prpcodibge,
  prptel,
  prpemail,
  prpresp,
  prplogo,
  prpobs,
  prpdatcad,
  modpnlcod
}) => {
  /*
  if (!nome || !telefone || !cnpj)
    throw new Error("nome, telefone e cnpj são obrigatórios");
  */
  return proprioRepo.create({
    prpdes, 
    prpfan, 
    prpcgc, 
    prpierg,
    prpincmun,
    prpend,
    prpcmp,
    prpnum,
    prpbai,
    prpmun,
    prpuf,
    prpcep,
    prpcodibge,
    prptel,
    prpemail,
    prpresp,
    prplogo,
    prpobs,
    prpdatcad,
    modpnlcod
  });
};

const update = async (prpcod, data) => {
  const updated = await proprioRepo.update(prpcod, data);
  if (!updated) throw new Error("Empresa não encontrada");
  return updated;
};

const getById = async (prpcod) => {
  return proprioRepo.findById(prpcod);
};

const list = async () => {
  return proprioRepo.findAll();
};

const remove = async (prpcod) => {
  const removed = await proprioRepo.remove(prpcod);
  if (!removed) throw new Error("Empresa não encontrada");
  return removed;
};

export default { create, update, getById, list, remove };
