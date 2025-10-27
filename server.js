import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";

import { verifyToken } from "./utils/authMiddleware.js";

import socketPlugin from "./plugins/socket.js";
import sequelize from "./config/database.js";

const app = Fastify({
  logger: {
    level:
      process.env.LOG_LEVEL ||
      (process.env.NODE_ENV === "production" ? "info" : "debug"),
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
              ignore: "pid,hostname",
            },
          },
  },
});

// middlewares globais
app.register(cors, { origin: true });
app.register(formbody);

// websocket
app.register(socketPlugin);

// Middleware global de autenticação JWT
app.addHook("onRequest", async (req, reply) => {
  const url = req.raw.url.split("?")[0];

  const publicRoutes = [
    /^\/painel\/auth\/login$/,
    /^\/painel\/auth\/cadastro$/
  ];

  if (publicRoutes.some((pattern) => pattern.test(url))) {
    return;
  }

  const res = await verifyToken(req, reply);
  if (res) return;
});

// rotas
import authRoutes from "./routes/auth.js";
import funcaoRoutes from "./routes/funcao.js";
import funcionarioRoutes from "./routes/funcionario.js";
import proprioRoutes from "./routes/proprio.js";
import movimentacaoRoutes from "./routes/movimentacao.js";
//import proprioFuncionarioRoutes from "./routes/proprioFuncionario.js";
import setorRoutes from "./routes/setor.js";

app.register(
  async (fastify) => {
    fastify.register(authRoutes, { prefix: "/auth" });
    fastify.register(funcaoRoutes, { prefix: "/funcoes" });
    fastify.register(funcionarioRoutes, { prefix: "/funcionarios" });
    fastify.register(proprioRoutes, { prefix: "/empresas" });
    fastify.register(movimentacaoRoutes, { prefix: "/movimentacoes" });
    //fastify.register(proprioFuncionarioRoutes, { prefix: "/proprio-funcionarios" });
    fastify.register(setorRoutes, { prefix: "/setores" });
  },
  { prefix: "/painel" }
);

// inicialização segura
const start = async () => {
  try {
    // Testa conexão ao banco
    await sequelize.authenticate();
    app.log.info(">> Conexao com banco de dados estabelecida <<");

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: false });
      app.log.info(">>  Banco sincronizado (modo desenvolvimento) <<");
    }

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || "0.0.0.0";
    await app.listen({ port: parseInt(port, 10), host });
  } catch (err) {
    app.log.error(">> Erro ao iniciar servidor <<");
    app.log.error(err.stack || err);
    process.exit(1);
  }
};

// inicia o servidor
start();
