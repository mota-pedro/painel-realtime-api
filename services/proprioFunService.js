import proprioFunRepo from "../repositories/proprioFunRepository.js";

const create = async ({ prpcod, funcod }) => {
  return proprioFunRepo.create({ prpcod, funcod });
};

const update = async (prpfuncod, data) => {
  const updated = await proprioFunRepo.update(prpfuncod, data);
  if (!updated) throw new Error("Correlação próprio-funcionário não encontrada");
  return updated;
};

const listByFuncionario = async (funcod) => {
  const proprioFuncionarios = await proprioFunRepo.findAllByFuncionario(funcod);
  if (!proprioFuncionarios) throw new Error("Nenhuma correlação próprio-funcionário encontrada para este funcionário");
  return proprioFuncionarios;
};

const listByProprio = async (prpcod) => {
  const proprioFuncionarios = await proprioFunRepo.findAllByProprio(prpcod);
  if (!proprioFuncionarios) throw new Error("Nenhuma correlação próprio-funcionário encontrada para este próprio");
  return proprioFuncionarios;
};

const getById = async (prpfuncod) => {
  return proprioFunRepo.findById(prpfuncod);
};

const remove = async (prpfuncod) => {
  const removed = await proprioFunRepo.remove(prpfuncod);
  if (!removed) throw new Error("Correlação próprio-funcionário não encontrada");
  return removed;
};

export default { create, update, listByFuncionario, listByProprio, getById, remove };
