import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Empresa",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING, allowNull: false },
      telefone: { type: DataTypes.STRING(15), allowNull: false },
      cnpj: { type: DataTypes.STRING(14), allowNull: false },
      ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "empresas",
      timestamps: true,
      underscored: true,
    }
  );
};
