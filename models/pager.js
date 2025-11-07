import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Pager = sequelize.define(
    "Pager",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id" },
      numero: { type: DataTypes.STRING, allowNull: false, field: "numero" },
      key_value: { type: DataTypes.STRING, allowNull: false, field: "key_value" },
      nome: { type: DataTypes.STRING, allowNull: false, field: "nome" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
      ocupado: { type: DataTypes.BOOLEAN, allowNull: false, field: "ocupado", defaultValue: false },
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
        ocupado: p.ocupado ?? false
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
        ocupado: json.ocupado ?? false
    };
    };

  return Pager;
};
