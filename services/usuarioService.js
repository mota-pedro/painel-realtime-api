import usuarioRepo from "../repositories/usuarioRepository.js";
import { hash } from "bcrypt";

const create = async ({
  empresa_id,
  nome,
  email,
  telefone,
  cpf,
  senha,
  ativo = true,
}) => {
  if (!empresa_id || !nome || !email || !cpf || !senha) {
    throw new Error("empresa_id, nome, email, cpf e senha são obrigatórios");
  }

  const senhaHash = await hash(senha, 10);

  return usuarioRepo.create({
    empresa_id,
    nome,
    email,
    telefone,
    cpf,
    senha: senhaHash,
    ativo,
  });
};

const update = async (id, data) => {
  if (data.senha) {
    data.senha = await hash(data.senha, 10);
  }
  const updated = await usuarioRepo.update(id, data);
  if (!updated) throw new Error("Usuário não encontrado");
  return updated;
};

const getById = async (id) => usuarioRepo.findById(id);

const list = async () => usuarioRepo.findAll();

const remove = async (id) => {
  const removed = await usuarioRepo.remove(id);
  if (!removed) throw new Error("Usuário não encontrado");
  return removed;
};

export default { create, update, getById, list, remove };
