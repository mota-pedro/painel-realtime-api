import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import userRepo from "../repositories/usuarioRepository.js";
import empresaRepo from "../repositories/empresaRepository.js";
import funcaoRepo from "../repositories/funcaoRepository.js";
import { jwtSecret, jwtExpiresIn } from "../utils/jwt.js";

const login = async ({ empresa_id, usuario_id, senha }) => {
  const empresa = await empresaRepo.findById(empresa_id);
  if (!empresa) throw new Error("Empresa não encontrada");

  const user = await userRepo.findById(usuario_id);
  if (!user) throw new Error("Usuário não encontrado");

  if (user.empresa_id !== empresa.id) {
    throw new Error("Usuário não pertence à empresa especificada");
  }

  const senhaOk = await bcrypt.compare(senha, user.senha);
  if (!senhaOk) throw new Error("Senha incorreta");

  const funcoes = await funcaoRepo.findAllByEmpresa(empresa_id);

  const token = jwt.sign(
    {
      userId: user.id,
      empresa_id: empresa.id,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );

  return {
    empresa: {
      id: empresa.id,
      nome: empresa.nome,
      cnpj: empresa.cnpj,
      telefone: empresa.telefone,
      ativo: empresa.ativo,
    },
    user: {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      telefone: user.telefone,
      ativo: user.ativo,
      empresa_id: user.empresa_id,
    },
    funcoes,
    token,
  };
};

const cadastro = async (dados) => {
  const {
    empresa_nome,
    empresa_email,
    empresa_telefone,
    empresa_cnpj,
    usuario_nome,
    usuario_email,
    usuario_telefone,
    usuario_cpf,
    usuario_senha,
  } = dados;

  const empresa = await empresaRepo.create({
    nome: empresa_nome,
    email: empresa_email,
    telefone: empresa_telefone,
    cnpj: empresa_cnpj,
    ativo: true,
  });

  if (!empresa?.id) {
    throw new Error("Falha ao criar empresa.");
  }

  const senhaHash = await bcrypt.hash(usuario_senha, 10);

  const usuario = await userRepo.create({
    empresa_id: empresa.id,
    nome: usuario_nome,
    email: usuario_email,
    telefone: usuario_telefone,
    cpf: usuario_cpf,
    senha: senhaHash,
    ativo: true,
  });

  const usuarioJSON = usuario.toJSON();
  delete usuarioJSON.senha;

  return {
    empresa,
    usuario: usuarioJSON,
  };
};

export default { login, cadastro };
