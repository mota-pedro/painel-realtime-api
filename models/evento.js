import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Evento",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      empresa_id: { type: DataTypes.INTEGER, allowNull: false },
      usuario_id: { type: DataTypes.INTEGER, allowNull: true },
      funcao_id: { type: DataTypes.INTEGER, allowNull: false },
      nome: { type: DataTypes.STRING, allowNull: false },
      descricao: { type: DataTypes.STRING, allowNull: false },
      dispositivo_id: { type: DataTypes.STRING, allowNull: true },
      receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "eventos",
      timestamps: true,
      underscored: true,
    }
  );
};
