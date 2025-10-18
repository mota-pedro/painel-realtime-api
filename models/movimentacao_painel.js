import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "MovimentacaoPainel",
    {
      mpncod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "MPNCOD" },
      mpndat: { type: DataTypes.DATEONLY, allowNull: true, field: "MPNDAT" },
      mpnhr: { type: DataTypes.TIME, allowNull: true, field: "MPNHR" },
      fnccod: { type: DataTypes.INTEGER, allowNull: true, field: "FNCCOD" },
      mpnstt: { type: DataTypes.CHAR(1), allowNull: true, field: "MPNSTT" },
      mpndatfin: { type: DataTypes.DATEONLY, allowNull: true, field: "MPNDATFIN" },
      mpnhrfin: { type: DataTypes.TIME, allowNull: true, field: "MPNHRFIN" },
      mpncodfin: { type: DataTypes.CHAR(10), allowNull: true, field: "MPNCODFIN" },
      setcod: { type: DataTypes.INTEGER, allowNull: true, field: "SETCOD" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
    },
    {
      tableName: "movimentacao_painel",
      timestamps: false,
      underscored: true,
    }
  );
};