import { DataTypes } from "sequelize";

export default (sequelize) => {
  const FormCampos = sequelize.define(
    "FormCampos",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
      nome: { type: DataTypes.STRING, allowNull: false, field: "nome" },
      tipo: { type: DataTypes.STRING, allowNull: false, field: "tipo" },
    },
    {
      tableName: "form_campos",
      timestamps: false,
      underscored: true,
    }
  );

  FormCampos.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (f) => ({
      id: f.id,
      empresaId: f.prpcod,
      nome: f.nome,
      tipo: f.tipo
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    FormCampos.fromJson = (json) => {
    if (!json) return null;

    return {
        id: json.id,
        nome: json.nome,
        tipo: json.tipo,
        prpcod: json.empresaId
    };
    };

  return FormCampos;
};
