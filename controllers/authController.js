import authService from "../services/authService.js";
import proprioFunService from "../services/proprioFunService.js";
import proprioService from "../services/proprioService.js";
import setorService from "../services/setorService.js";
import models from "../models/modelos.js";
const { Funcionario, Proprio } = models;
const { login: _login, cadastro: _cadastro } = authService;
const { getById: _getById } = proprioService;
const { create: _createProprioFun, listByFuncionario: _listByFuncionario } = proprioFunService;
const { listByProprio: _listByProprio } = setorService;

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
    const e = await _getById(result.funcionario.prpcod);
    
    const setoresEmpresa = await _listByProprio(e.prpcod);
    const setores = [];
    for (const setor of setoresEmpresa) {
      setores.push({id: setor.setcod});
    }

    const funcionario = Funcionario.mapearParaJson(result.funcionario);
    const empresa = Proprio.mapearParaJson(e);


    /*
    const empresasFuncionario = await _listByFuncionario(funcionario.id);
    const empresas = [];
    for (const empresa of empresasFuncionario) {
      const e = await Proprio.findOne({
        where: { prpcod: empresa.prpcod },
      });
      const setoresEmpresa = await _listByProprio(empresa.prpcod);
      const setores = [];
      for (const setor of setoresEmpresa) {
        setores.push({id: setor.setcod});
      }      
      const eFormated = Proprio.mapearParaJson(e);
      empresas.push({ id: eFormated.id, nome: eFormated.nome, cnpj: eFormated.cnpj, setores: setores });
    }
      */

    console.log("Movimentações da empresa:", result);
    return reply.send({
      funcionario: {
        id: funcionario.id,
        login: funcionario.login,
        nome: funcionario.nome,
        cpf: funcionario.cpf,
      },
      empresa: {
        id: empresa.id,
        nome: empresa.nome,
        cnpj: empresa.cnpj
      },
      setores: setores,
      token: result.token,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(400).send({ error: err.message });
  }
};

const cadastro = async (req, reply) => {
    try {
      const empDados = Proprio.fromJson(req.body.empresa);

      const funcDados = Funcionario.fromJson(req.body.funcionario);

      /*
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
          */

      const result = await _cadastro({
        proprio: empDados,
        funcionario: funcDados,
      });

      /*
      const proprioFun = await _createProprioFun({
        prpcod: result.empresa.prpcod,
        funcod: result.funcionario.funcod,
      });

      if (!proprioFun || !proprioFun.prpfuncod) {
        return reply.status(500).send({ error: "Erro ao associar proprietário e funcionário." });
      }

      console.log("ProprioFun criado:", proprioFun);
      */

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
