// models/funcao.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Funcao",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      empresa_id: { type: DataTypes.STRING, allowNull: false },
      nome: { type: DataTypes.STRING, allowNull: false },
      descricao: { type: DataTypes.TEXT, allowNull: true },
      ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "funcoes",
      timestamps: true,
      underscored: true,
    }
  );
};
