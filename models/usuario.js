import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Usuario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      empresa_id: { type: DataTypes.INTEGER, allowNull: false },
      nome: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      telefone: { type: DataTypes.STRING(15), allowNull: false },
      cpf: { type: DataTypes.STRING(11), allowNull: false },
      senha: { type: DataTypes.STRING, allowNull: false },
      ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "usuarios",
      timestamps: true,
      underscored: true,
    }
  );
};
