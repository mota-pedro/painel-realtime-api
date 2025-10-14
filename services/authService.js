import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import funcionarioRepo from "../repositories/funcionarioRepository.js";
import proprioRepo from "../repositories/proprioRepository.js";
import movimentacaoRepo from "../repositories/movimentacaoRepository.js";
import { jwtSecret, jwtExpiresIn } from "../utils/jwt.js";

const login = async ({ prpcod, funcod, funsen }) => {
  const proprio = await proprioRepo.findById(prpcod);
  if (!proprio) throw new Error("Empresa não encontrada");

  const funcionario = await funcionarioRepo.findById(funcod);
  if (!funcionario) throw new Error("Funcionário não encontrado");

  /*
  if (funcionario.empresa_id !== proprio.id) {
    throw new Error("Funcionário não pertence à empresa especificada");
  }
    */

  const senhaOk = await bcrypt.compare(funsen, funcionario.funsen);
  if (!senhaOk) throw new Error("Senha incorreta");

  const movimentacoes = await movimentacaoRepo.findAllByProprio(prpcod);

  const token = jwt.sign(
    {
      funcod: funcionario.funcod,
      prpcod: proprio.prpcod,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );

  return {
    proprio: {
      prpcod: proprio.prpcod,
      prpdes: proprio.prpdes,
    },
    funcionario: {
      funcod: funcionario.funcod,
      fundes: funcionario.fundes,
    },
    movimentacoes,
    token,
  };
};

const cadastro = async (dados) => {
  const {
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
    modpnlcod,
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
  } = dados;

  const proprio = await proprioRepo.create({
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
    modpnlcod,
  });

  if (!proprio?.prpcod) {
    throw new Error("Falha ao cadastrar a empresa (próprio).");
  }

  const senhaHash = await bcrypt.hash(funsen, 10);

  const funcionario = await funcionarioRepo.create({
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

  const funcionarioJSON = funcionario.toJSON();
  delete funcionarioJSON.senha;

  return {
    empresa: proprio,
    funcionario: funcionarioJSON,
  };
};

export default { login, cadastro };
