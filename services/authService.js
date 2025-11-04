import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import funcionarioRepo from "../repositories/funcionarioRepository.js";
import proprioRepo from "../repositories/proprioRepository.js";
import { jwtSecret, jwtExpiresIn } from "../utils/jwt.js";

const login = async ({ funlog, funsen }) => {
  const funcionario = await funcionarioRepo.findByLogin(funlog);
  if (!funcionario) throw new Error("Funcionário não encontrado");

  const senhaOk = await bcrypt.compare(funsen, funcionario.funsen);
  if (!senhaOk) throw new Error("Senha incorreta");

  const token = jwt.sign(
    {
      funcod: funcionario.funcod,
      funcpf: funcionario.funcpf,
      empresaId: funcionario.prpcod
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );

  return {
    funcionario: {
      funcod: funcionario.funcod,
      funlog: funcionario.funlog,
      fundes: funcionario.fundes,
      funcpf: funcionario.funcpf,
      prpcod: funcionario.prpcod
    },
    token,
  };
};

const cadastro = async (dados) => {
  const proprio = await proprioRepo.create(dados.proprio);
  if (!proprio?.prpcod) throw new Error("Falha ao cadastrar a empresa (próprio).");

  const senhaHash = await bcrypt.hash(dados.funcionario.funsen, 10);

  const funcionario = await funcionarioRepo.create({
    ...dados.funcionario,
    funsen: senhaHash,
    prpcod: proprio.prpcod
  });

  const funcionarioJSON = funcionario.toJSON();
  delete funcionarioJSON.funsen;

  return { empresa: proprio, funcionario: funcionarioJSON };
};


export default { login, cadastro };
