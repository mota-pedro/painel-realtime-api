import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Funcao",
    {
      fnccod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "FNCCOD" },
      fncdes: { type: DataTypes.STRING(40), allowNull: true, field: "FNCDES" },
      fncdis: { type: DataTypes.CHAR(3), allowNull: true, field: "FNCDIS" },
      fncbot: { type: DataTypes.CHAR(2), allowNull: true, field: "FNCBOT" },
      fncdatcad: { type: DataTypes.DATE, allowNull: true, field: "FNCDATCAD" },
      setcod: { type: DataTypes.INTEGER, allowNull: true, field: "SETCOD" },
      arecod: { type: DataTypes.CHAR(5), allowNull: true, field: "ARECOD" },
      pescod: { type: DataTypes.CHAR(5), allowNull: true, field: "PESCOD" },
      fnctmpexp: { type: DataTypes.TIME, allowNull: true, field: "FNCTMPEXP" },
      fncbotfec: { type: DataTypes.CHAR(1), allowNull: true, field: "FNCBOTFEC" },
      fncdigver: { type: DataTypes.CHAR(3), allowNull: true, field: "FNCDIGVER" },
    },
    {
      tableName: "funcao",
      timestamps: false,
      underscored: true,
    }
  );
};
