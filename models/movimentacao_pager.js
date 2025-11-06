import { DataTypes } from "sequelize";
import { format } from "sequelize/lib/utils";

export default (sequelize) => {
  const MovimentacaoPager = sequelize.define(
    "MovimentacaoPager",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id" },
      pagerId: { type: DataTypes.INTEGER, allowNull: false, field: "pagerId" },
      data: { type: DataTypes.DATEONLY, allowNull: true, field: "data" },
      hora: { type: DataTypes.TIME, allowNull: true, field: "hora" },
      ocupado: { type: DataTypes.BOOLEAN, allowNull: false, field: "ocupado", defaultValue: false },
      dataFim: { type: DataTypes.DATEONLY, allowNull: true, field: "dataFim" },
      horaFim: { type: DataTypes.TIME, allowNull: true, field: "horaFim" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
    },
    {
      tableName: "movimentacao_pager",
      timestamps: false,
      underscored: true,
    }
  );

  MovimentacaoPager.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (m) => ({
        id: m.id,
        pagerId: m.pagerId,
        data: m.data,
        hora: m.hora,
        ocupado: m.ocupado ?? false,
        dataFim: m.dataFim ?? null,
        horaFim: m.horaFim ?? null,
        empresaId: m.prpcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  MovimentacaoPager.fromJson = (json) => {
    if (!json) return null;

    const data = json.data;
    const hora = json.hora;
    const dataFim = json.dataFim;
    const horaFim = json.horaFim;

    const formatDate = (date) => {
      if (!date) return null;
      return date.toString().split("T")[0];
    };

    const formatTime = (time) => {
      if (!time) return null;
      return time.toString().split(".")[0];
    };

    return {
    id: json.id,
    data: formatDate(data),
    hora: formatTime(hora),
    ocupado: json.ocupado ?? false,
    dataFim: json.dataFim ? formatDate(dataFim) : null,
    horaFim: json.horaFim ? formatTime(horaFim) : null,
    pagerId: json.pagerId,
    prpcod: json.empresaId,
  };
  };

  return MovimentacaoPager;
};
