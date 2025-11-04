import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Vinculos = sequelize.define(
    "Vinculos",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id" },
      botao_key: { type: DataTypes.STRING, allowNull: false, field: "botao_key" },
      botao_nome: { type: DataTypes.STRING, allowNull: false, field: "botao_nome" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
      fnccod: { type: DataTypes.INTEGER, allowNull: false, field: "FNCCOD" }
    },
    {
      tableName: "vinculos",
      timestamps: false,
      underscored: true,
    }
  );

  Vinculos.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (v) => ({
      id: v.id,
      botao_nome: v.botao_nome,
      botao_key: v.botao_key,
      empresaId: v.prpcod,
      funcaoId: v.fnccod
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    Vinculos.fromJson = (json) => {
    if (!json) return null;

    return {
        id: json.id,
        botao_nome: json.botao_nome,
        botao_key: json.botao_key,
        prpcod: json.empresaId,
        fnccod: json.funcaoId
    };
    };

  return Vinculos;
};
