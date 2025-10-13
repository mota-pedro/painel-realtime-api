import authService from "../services/authService.js";
const { login: _login, cadastro: _cadastro } = authService;

const login = async (req, reply) => {
  try {
    const { empresa_id, usuario_id, senha } = req.body;

    if (!empresa_id || !usuario_id || !senha) {
      return reply
        .status(400)
        .send({ error: "Parâmetros obrigatórios ausentes" });
    }

    const result = await _login({ empresa_id, usuario_id, senha });
    console.log("01 Funções da empresa:", result);
    return reply.send({
      empresa: {
        id: result.empresa.id,
        nome: result.empresa.nome,
        cnpj: result.empresa.cnpj,
        telefone: result.empresa.telefone,
        ativo: result.empresa.ativo,
      },
      user: {
        id: result.user.id,
        nome: result.user.nome,
        cpf: result.user.cpf,
        email: result.user.email,
        telefone: result.user.telefone,
        ativo: result.user.ativo,
      },
      funcoes: result.funcoes,
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
      empresa_nome,
      empresa_email,
      empresa_telefone,
      empresa_cnpj,
      usuario_nome,
      usuario_email,
      usuario_telefone,
      usuario_cpf,
      usuario_senha,
    } = req.body;

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

    const result = await _cadastro({
      empresa_nome,
      empresa_email,
      empresa_telefone,
      empresa_cnpj,
      usuario_nome,
      usuario_email,
      usuario_telefone,
      usuario_cpf,
      usuario_senha,
    });

    return reply.status(201).send({
      mensagem: "Dados cadastrados",
      empresa: result.empresa,
      usuario: result.usuario,
    });
  } catch (err) {
    req.log.error(err);
    return reply.status(500).send({ error: err.message });
  }
};

export default { login, cadastro };
