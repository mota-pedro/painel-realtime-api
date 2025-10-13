import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// importar modelos como ES Modules
import FuncionarioModel from "./funcionario.js";
import MovimentacaoModel from "./movimentacao_painel.js";
import ProprioModel from "./proprio.js";
import FuncaoModel from "./funcao.js";
import ModeloPainelModel from "./modelo_painel.js";
import ProprioFuncionarioModel from "./proprio_funcionario.js";
import SysConfigModel from "./sys_config.js";
import SetorModel from "./setor.js";

const Funcionario = FuncionarioModel(sequelize);
const MovimentacaoPainel = MovimentacaoModel(sequelize);
const Proprio = ProprioModel(sequelize);
const Funcao = FuncaoModel(sequelize);
const ModeloPainel = ModeloPainelModel(sequelize);
const ProprioFuncionario = ProprioFuncionarioModel(sequelize);
const SysConfig = SysConfigModel(sequelize);
const Setor = SetorModel(sequelize);

export { sequelize, Sequelize };
export default { Funcionario, MovimentacaoPainel, Proprio, Funcao, ModeloPainel, ProprioFuncionario, SysConfig, Setor };
