import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Proprio",
    {
      prpcod: { type: DataTypes.CHAR(4), primaryKey: true, allowNull: false, field: "PRPCOD" },
      prpdes: { type: DataTypes.STRING(60), allowNull: true, field: "PRPDES" },
      prpfan: { type: DataTypes.STRING(30), allowNull: true, field: "PRPFAN" },
      prpcgc: { type: DataTypes.STRING(14), allowNull: true, field: "PRPCGC" },
      prpierg: { type: DataTypes.STRING(18), allowNull: true, field: "PRPIERG" },
      prpincmun: { type: DataTypes.STRING(18), allowNull: true, field: "PRPINCMUN" },
      prpend: { type: DataTypes.STRING(40), allowNull: true, field: "PRPEND" },
      prpcmp: { type: DataTypes.STRING(15), allowNull: true, field: "PRPCMP" },
      prpnum: { type: DataTypes.STRING(6), allowNull: true, field: "PRPNUM" },
      prpbai: { type: DataTypes.STRING(20), allowNull: true, field: "PRPBAI" },
      prpmun: { type: DataTypes.STRING(40), allowNull: true, field: "PRPMUN" },
      prpuf: { type: DataTypes.CHAR(2), allowNull: true, field: "PRPUF" },
      prpcep: { type: DataTypes.STRING(10), allowNull: true, field: "PRPCEP" },
      prpcodibge: { type: DataTypes.CHAR(7), allowNull: true, field: "PRPCODIBGE" },
      prptel: { type: DataTypes.STRING(12), allowNull: true, field: "PRPTEL" },
      prpemail: { type: DataTypes.STRING(100), allowNull: true, field: "PRPEMAIL" },
      prpresp: { type: DataTypes.STRING(40), allowNull: true, field: "PRPRESP" },
      prplogo: { type: DataTypes.BLOB("long"), allowNull: true, field: "PRPLOGO" },
      prpobs: { type: DataTypes.STRING(120), allowNull: true, field: "PRPOBS" },
      prpdatcad: { type: DataTypes.DATE, allowNull: true, field: "PRPDATCAD" },
      modpnlcod: { type: DataTypes.INTEGER, allowNull: true, field: "MODPNLCOD" },
    },
    {
      tableName: "proprio",
      timestamps: false,
      underscored: true,
    }
  );
};