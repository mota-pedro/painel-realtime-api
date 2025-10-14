import funcionarioRepo from "../repositories/funcionarioRepository.js";
import { hash } from "bcrypt";

const create = async ({
  fundes,
  funcpf,
  funrg,
  funend,
  funbai,
  funcmp,
  funnum,
  funmun,
  funuf,
  funcep,
  funcodibge,
  funtel,
  funemail,
  funfotdoc,
  funobs,
  funlog,
  funsen,
  fundatcad,
  funati,
}) => {
  /*
  if (!empresa_id || !nome || !email || !cpf || !senha) {
    throw new Error("empresa_id, nome, email, cpf e senha são obrigatórios");
  }
    */

  const senhaHash = await hash(funsen, 10);

  return funcionarioRepo.create({
    fundes,
    funcpf,
    funrg,
    funend,
    funbai,
    funcmp,
    funnum,
    funmun,
    funuf,
    funcep,
    funcodibge,
    funtel,
    funemail,
    funfotdoc,
    funobs,
    funlog,
    funsen: senhaHash,
    fundatcad,
    funati,
  });
};

const update = async (funcod, data) => {
  if (data.funsen) {
    data.funsen = await hash(data.funsen, 10);
  }
  const updated = await funcionarioRepo.update(funcod, data);
  if (!updated) throw new Error("Funcionário não encontrado");
  return updated;
};

const getById = async (funcod) => funcionarioRepo.findById(funcod);

const list = async () => funcionarioRepo.findAll();

const remove = async (funcod) => {
  const removed = await funcionarioRepo.remove(funcod);
  if (!removed) throw new Error("Funcionário não encontrado");
  return removed;
};

export default { create, update, getById, list, remove };
