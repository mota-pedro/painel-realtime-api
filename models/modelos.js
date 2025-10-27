import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// importar modelos como ES Modules
import FuncionarioModel from "./funcionario.js";
import MovimentacaoModel from "./movimentacao_painel.js";
import ProprioModel from "./proprio.js";
import FuncaoModel from "./funcao.js";
import ModeloPainelModel from "./modelo_painel.js";
import ProprioFuncionarioModel from "./proprio_funcionario.js";
import ProprioSetorModel from "./proprio_setor.js";
import SysConfigModel from "./sys_config.js";
import SetorModel from "./setor.js";

const Funcionario = FuncionarioModel(sequelize);
const MovimentacaoPainel = MovimentacaoModel(sequelize);
const Proprio = ProprioModel(sequelize);
const Funcao = FuncaoModel(sequelize);
const ModeloPainel = ModeloPainelModel(sequelize);
const ProprioFuncionario = ProprioFuncionarioModel(sequelize);
const ProprioSetor = ProprioSetorModel(sequelize);
const SysConfig = SysConfigModel(sequelize);
const Setor = SetorModel(sequelize);

// ProprioFuncionario pertence a Proprio e Funcionario
ProprioFuncionario.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod', // campo PK na tabela proprio
  as: 'proprio'
});

ProprioFuncionario.belongsTo(Funcionario, {
  foreignKey: 'funcod',
  targetKey: 'funcod', // campo PK na tabela funcionario
  as: 'funcionario'
});

// Proprio tem muitos ProprioFuncionario
Proprio.hasMany(ProprioFuncionario, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'propriosFuncionarios'
});

// Funcionario tem muitos ProprioFuncionario
Funcionario.hasMany(ProprioFuncionario, {
  foreignKey: 'funcod',
  sourceKey: 'funcod',
  as: 'propriosFuncionarios'
});

// ProprioSetor pertence a Proprio e Setor
ProprioSetor.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod', // campo PK na tabela proprio
  as: 'proprio'
});

ProprioSetor.belongsTo(Setor, {
  foreignKey: 'setcod',
  targetKey: 'setcod', // campo PK na tabela setor
  as: 'setor'
});

// Proprio tem muitos ProprioSetor
Proprio.hasMany(ProprioSetor, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'propriosSetores'
});

// Setor tem muitos ProprioSetor
Setor.hasMany(ProprioSetor, {
  foreignKey: 'setcod',
  sourceKey: 'setcod',
  as: 'setoresProprios'
});

// MovimentacaoPainel pertence a um Proprio
MovimentacaoPainel.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod',
  as: 'proprio'
});

// Um Proprio tem muitas MovimentacoesPainel
Proprio.hasMany(MovimentacaoPainel, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'movimentacoesPainel'
});

// MovimentacaoPainel pertence a uma Funcao
MovimentacaoPainel.belongsTo(Funcao, {
  foreignKey: 'fnccod',
  targetKey: 'fnccod',
  as: 'funcao'
});

// Uma Funcao tem muitas MovimentacoesPainel
Funcao.hasMany(MovimentacaoPainel, {
  foreignKey: 'fnccod',
  sourceKey: 'fnccod',
  as: 'movimentacoesPainel'
});

export { sequelize, Sequelize };
export default { Funcionario, MovimentacaoPainel, Proprio, Funcao, ModeloPainel, ProprioFuncionario, ProprioSetor, SysConfig, Setor };
