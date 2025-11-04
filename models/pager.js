import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Pager = sequelize.define(
    "Pager",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id" },
      numero: { type: DataTypes.STRING, allowNull: false, field: "numero" },
      key_value: { type: DataTypes.STRING, allowNull: false, field: "key_value" },
      nome: { type: DataTypes.STRING, allowNull: false, field: "nome" },
      cliente: { type: DataTypes.STRING, allowNull: true, field: "cliente" },
      observacao: { type: DataTypes.STRING, allowNull: true, field: "observacao" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" }
    },
    {
      tableName: "pager",
      timestamps: false,
      underscored: true,
    }
  );

  Pager.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (p) => ({
        id: p.id,
        nome: p.nome,
        key_value: p.key_value,
        empresaId: p.prpcod,
        numero: p.numero,
        cliente: p.cliente ?? null,
        observacao: p.observacao ?? null
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    Pager.fromJson = (json) => {
    if (!json) return null;

    return {
        id: json.id,
        nome: json.nome,
        key_value: json.key_value,
        prpcod: json.empresaId,
        numero: json.numero,
        cliente: json.cliente ?? null,
        observacao: json.observacao ?? null
    };
    };

  return Pager;
};
