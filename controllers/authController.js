import authService from "../services/authService.js";
import proprioFunService from "../services/proprioFunService.js";
const { login: _login, cadastro: _cadastro } = authService;
const { create: _createProprioFun, listByFuncionario: _listByFuncionario } = proprioFunService;

const login = async (req, reply) => {
  try {
    const { funcod, funsen } = req.body;

    if (!funcod || !funsen) {
      return reply
        .status(400)
        .send({ error: "Parâmetros obrigatórios ausentes" });
    }

    const result = await _login({ funcod, funsen });
    console.log("Movimentações da empresa:", result);
    return reply.send({
      funcionario: {
        funcod: result.funcionario.funcod,
        fundes: result.funcionario.fundes,
        funcpf: result.funcionario.funcpf,
      },
      token: result.token,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const cadastro = async (req, reply) => {
  try {
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
    } = req.body;

    /*
    if (
      !empresa_nome ||
      !empresa_cnpj ||
      !usuario_nome ||
      !usuario_email ||
      !usuario_senha
    ) {
      return reply
        .status(400)
        .send({ error: "Campos obrigatórios ausentes no cadastro." });
    }
        */

    const result = await _cadastro({
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
    });

    const proprioFun = await _createProprioFun({
      prpcod: result.empresa.prpcod,
      funcod: result.funcionario.funcod,
    });

    if (!proprioFun || !proprioFun.prpfuncod) {
      return reply.status(500).send({ error: "Erro ao associar proprietário e funcionário." });
    }

    console.log("ProprioFun criado:", proprioFun);

    return reply.status(201).send({
      mensagem: "Dados cadastrados",
      empresa: result.empresa,
      funcionario: result.funcionario,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

export default { login, cadastro };
