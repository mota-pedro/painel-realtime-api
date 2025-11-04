import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// importar modelos como ES Modules
import FuncionarioModel from "./funcionario.js";
import MovimentacaoModel from "./movimentacao_painel.js";
import ProprioModel from "./proprio.js";
import FuncaoModel from "./funcao.js";
import ModeloPainelModel from "./modelo_painel.js";
//import ProprioFuncionarioModel from "./proprio_funcionario.js";
import SysConfigModel from "./sys_config.js";
import SetorModel from "./setor.js";
import VinculoModel from "./vinculos.js";
import PagerModel from "./pager.js";

const Funcionario = FuncionarioModel(sequelize);
const MovimentacaoPainel = MovimentacaoModel(sequelize);
const Proprio = ProprioModel(sequelize);
const Funcao = FuncaoModel(sequelize);
const ModeloPainel = ModeloPainelModel(sequelize);
//const ProprioFuncionario = ProprioFuncionarioModel(sequelize);
const SysConfig = SysConfigModel(sequelize);
const Setor = SetorModel(sequelize);
const Vinculo = VinculoModel(sequelize);
const Pager = PagerModel(sequelize);

// Pager pertence a proprio
Pager.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod', // campo PK na tabela proprio
  as: 'proprio'
});

// Proprio tem muitos Pagers
Proprio.hasMany(Pager, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'pagers'
});

// Vinculo pertence a Proprio e Funcao
Vinculo.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod', // campo PK na tabela proprio
  as: 'proprio'
});

Vinculo.belongsTo(Funcao, {
  foreignKey: 'fnccod',
  targetKey: 'fnccod', // campo PK na tabela funcao
  as: 'funcao'
});

// Proprio tem muitos Vinculo
Proprio.hasMany(Vinculo, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'vinculos'
});

// Funcao tem muitos Vinculo
Funcao.hasMany(Vinculo, {
  foreignKey: 'fnccod',
  sourceKey: 'fnccod',
  as: 'vinculos'
});


// Funcionario pertence a um Proprio
Funcionario.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod',
  as: 'proprio'
});

// Proprio tem muitos Funcionarios
Proprio.hasMany(Funcionario, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'funcionarios'
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

// MovimentacaoPainel pertence a um Proprio
Funcao.belongsTo(Setor, {
  foreignKey: 'setcod',
  targetKey: 'setcod',
  as: 'setores'
});

// Um Proprio tem muitas MovimentacoesPainel
Setor.hasMany(Funcao, {
  foreignKey: 'setcod',
  sourceKey: 'setcod',
  as: 'funcao'
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

// Setor pertence a um Proprio
Setor.belongsTo(Proprio, {
  foreignKey: 'prpcod',
  targetKey: 'prpcod',
  as: 'proprio'
});

// Proprio tem muitos Setores
Proprio.hasMany(Setor, {
  foreignKey: 'prpcod',
  sourceKey: 'prpcod',
  as: 'setores'
});

export { sequelize, Sequelize };
export default { Funcionario, MovimentacaoPainel, Proprio, Funcao, ModeloPainel, SysConfig, Setor, Vinculo, Pager };
