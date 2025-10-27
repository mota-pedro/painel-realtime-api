import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Setor = sequelize.define(
    "Setor",
    {
      setcod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "SETCOD" },
      setdes: { type: DataTypes.STRING(40), allowNull: true, field: "SETDES" },
      setdatcad: { type: DataTypes.DATE, allowNull: true, field: "SETDATCAD" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" }
    },
    {
      tableName: "setor",
      timestamps: false,
      underscored: true,
    }
  );

  Setor.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (s) => ({
      id: s.setcod,
      nome: s.setdes,
      dataCadastro: s.setdatcad ?? null,
      empresaId: s.prpcod
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    Setor.fromJson = (json) => {
    if (!json) return null;

    return {
        setcod: json.id,
        setdes: json.nome,
        setdatcad: json.dataCadastro ?? null,
        prpcod: json.empresaId
    };
    };

  return Setor;
};
