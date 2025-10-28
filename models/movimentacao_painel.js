import { DataTypes } from "sequelize";
import { format } from "sequelize/lib/utils";

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

    const mpndat = json.data;
    const mpnhr = json.hora;
    const mpndatfin = json.dataFim;
    const mpnhrfin = json.horaFim;

    const formatDate = (date) => {
      if (!date) return null;
      return date.toString().split("T")[0];
    };

    const formatTime = (time) => {
      if (!time) return null;
      return time.toString().split(".")[0];
    };

    return {
    mpncod: json.id,
    mpndat: formatDate(mpndat),
    mpnhr: formatTime(mpnhr),
    fnccod: json.funcaoId,
    mpnstt: json.status ?? 'A',
    mpndatfin: json.dataFim ? formatDate(mpndatfin) : null,
    mpnhrfin: json.horaFim ? formatTime(mpnhrfin) : null,
    mpncodfin: json.finalizacaoId ?? null,
    setcod: json.setorId,
    prpcod: json.empresaId,
  };
  };

  return MovimentacaoPainel;
};
