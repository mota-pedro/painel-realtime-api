import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Funcionario",
    {
      funcod: { type: DataTypes.CHAR(6), primaryKey: true, allowNull: false, field: "FUNCOD" },
      fundes: { type: DataTypes.STRING(30), allowNull: true, field: "FUNDES" },
      funcpf: { type: DataTypes.STRING(14), allowNull: true, field: "FUNCPF" },
      funrg: { type: DataTypes.STRING(20), allowNull: true, field: "FUNRG" },
      funend: { type: DataTypes.STRING(200), allowNull: true, field: "FUNEND" },
      funbai: { type: DataTypes.STRING(100), allowNull: true, field: "FUNBAI" },
      funcmp: { type: DataTypes.STRING(15), allowNull: true, field: "FUNCMP" },
      funnum: { type: DataTypes.STRING(6), allowNull: true, field: "FUNNUM" },
      funmun: { type: DataTypes.STRING(100), allowNull: true, field: "FUNMUN" },
      funuf: { type: DataTypes.CHAR(2), allowNull: true, field: "FUNUF" },
      funcep: { type: DataTypes.STRING(10), allowNull: true, field: "FUNCEP" },
      funcodibge: { type: DataTypes.CHAR(7), allowNull: true, field: "FUNCODIBGE" },
      funtel: { type: DataTypes.STRING(12), allowNull: true, field: "FUNTEL" },
      funemail: { type: DataTypes.STRING(100), allowNull: true, field: "FUNEMAIL" },
      funfotdoc: { type: DataTypes.BLOB("long"), allowNull: true, field: "FUNFOTDOC" },
      funobs: { type: DataTypes.STRING(100), allowNull: true, field: "FUNOBS" },
      funlog: { type: DataTypes.STRING(20), allowNull: true, field: "FUNLOG" },
      funsen: { type: DataTypes.STRING(10), allowNull: true, field: "FUNSEN" },
      fundatcad: { type: DataTypes.DATE, allowNull: true, field: "FUNDATCAD" },
      funati: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: "N", field: "FUNATI" },
    },
    {
      tableName: "funcionario",
      timestamps: false,
      underscored: true,
    }
  );
};