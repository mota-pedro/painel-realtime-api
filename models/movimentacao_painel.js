import { DataTypes } from "sequelize";

export default (sequelize) => {
  const MovimentacaoPainel = sequelize.define(
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

  MovimentacaoPainel.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (m) => ({
      id: m.mpncod,
      data: m.mpndat,
      hora: m.mpnhr,
      funcaoId: m.fnccod,
      status: m.mpnstt ?? 'A',
      dataFim: m.mpndatfin ?? null,
      horaFim: m.mpnhrfin ?? null,
      finalizacaoId: m.mpncodfin ?? null,
      setorId: m.setcod,
      empresaId: m.prpcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  MovimentacaoPainel.fromJson = (json) => {
    if (!json) return null;

    return {
      mpncod: json.id,
      mpndat: json.data ?? new Date().toISOString().split("T")[0],
      mpnhr: json.hora ?? new Date().toISOString().split("T")[1].split(".")[0],
      fnccod: json.funcaoId,
      mpnstt: json.status ?? 'A',
      mpndatfin: json.dataFim ?? null,
      mpnhrfin: json.horaFim ?? null,
      mpncodfin: json.finalizacaoId ?? null,
      setcod: json.setorId,
      prpcod: json.empresaId,
    };
  };

  return MovimentacaoPainel;
};
