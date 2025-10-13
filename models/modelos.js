import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// importar modelos como ES Modules
import UsuarioModel from "./usuario.js";
import EventoModel from "./evento.js";
import EmpresaModel from "./empresa.js";
import FuncaoModel from "./funcao.js";

const Usuario = UsuarioModel(sequelize);
const Evento = EventoModel(sequelize);
const Empresa = EmpresaModel(sequelize);
const Funcao = FuncaoModel(sequelize);

// associações
Empresa.hasMany(Usuario, {
  foreignKey: "empresa_id",
  sourceKey: "id",
  constraints: false,
});
Usuario.belongsTo(Empresa, {
  foreignKey: "empresa_id",
  targetKey: "id",
  constraints: false,
});
Empresa.hasMany(Evento, {
  foreignKey: "empresa_id",
  sourceKey: "id",
  constraints: false,
});
Evento.belongsTo(Empresa, {
  foreignKey: "empresa_id",
  targetKey: "id",
  constraints: false,
});
Empresa.hasMany(Funcao, {
  foreignKey: "empresa_id",
  sourceKey: "id",
  constraints: false,
});
Funcao.belongsTo(Empresa, {
  foreignKey: "empresa_id",
  targetKey: "id",
  constraints: false,
});

export { sequelize, Sequelize };
export default { Usuario, Evento, Empresa, Funcao };
