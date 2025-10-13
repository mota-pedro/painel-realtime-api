import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "MovimentacaoPainel",
    {
      mpncod: { type: DataTypes.CHAR(10), primaryKey: true, allowNull: false, field: "MPNCOD" },
      mpndat: { type: DataTypes.DATEONLY, allowNull: true, field: "MPNDAT" },
      mpnhr: { type: DataTypes.TIME, allowNull: true, field: "MPNHR" },
      fnccod: { type: DataTypes.CHAR(5), allowNull: true, field: "FNCCOD" },
      mpnstt: { type: DataTypes.CHAR(1), allowNull: true, field: "MPNSTT" },
      mpndatfin: { type: DataTypes.DATEONLY, allowNull: true, field: "MPNDATFIN" },
      mpnhrfin: { type: DataTypes.TIME, allowNull: true, field: "MPNHRFIN" },
      mpncodfin: { type: DataTypes.CHAR(10), allowNull: true, field: "MPNCODFIN" },
      setcod: { type: DataTypes.CHAR(5), allowNull: true, field: "SETCOD" },
    },
    {
      tableName: "movimentacao_painel",
      timestamps: false,
      underscored: true,
    }
  );
};