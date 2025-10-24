import authService from "../services/authService.js";
import proprioFunService from "../services/proprioFunService.js";
import models from "../models/modelos.js";
const { Funcionario, Proprio } = models;
const { login: _login, cadastro: _cadastro } = authService;
const { create: _createProprioFun, listByFuncionario: _listByFuncionario } = proprioFunService;

const login = async (req, reply) => {
  try {

    console.log(`REQ JSON: ${JSON.stringify(req.body)}`);
    console.log(`REQ FROM JSON: ${JSON.stringify(Funcionario.fromJson(req.body))}`);

    const { funlog, funsen } = Funcionario.fromJson(req.body);

    if (!funlog || !funsen) {
      return reply
        .status(400)
        .send({ error: "Parâmetros obrigatórios ausentes" });
    }

    const result = await _login({ funlog, funsen });
    const funcionario = Funcionario.mapearParaJson(result.funcionario);

    console.log("Movimentações da empresa:", result);
    return reply.send({
      funcionario: {
        id: funcionario.id,
        login: funcionario.login,
        nome: funcionario.nome,
        cpf: funcionario.cpf,
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
      modpnlcod
    } = Proprio.fromJson(req.body.empresa);

    const {
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
      funati
    } = Funcionario.fromJson(req.body.funcionario);

    if (
      !prpdes ||
      !prpcgc ||
      !fundes ||
      !funcpf ||
      !funlog ||
      !funsen
    ) {
      return reply
        .status(400)
        .send({ error: "Campos obrigatórios ausentes no cadastro." });
    }

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
      empresa_id: result.empresa.prpcod,
      funcionario_id: result.funcionario.funcod,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

export default { login, cadastro };
