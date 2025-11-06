import { DataTypes } from "sequelize";

export default (sequelize) => {
    const MovimentacaoPagerCampos = sequelize.define(
        "MovimentacaoPagerCampos",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "id"},
            formCampoId: {type: DataTypes.INTEGER, allowNull: false, field: "formCampoId"},
            movPagerId: {type: DataTypes.INTEGER, allowNull: false, field: "movPagerId"},
            valor: {type: DataTypes.STRING, allowNull: false, field: "valor"},
        },
        {
            tableName: "movimentacao_pager_campos",
            timestamps: false,
            underscored: true,
        }
    );

    MovimentacaoPagerCampos.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (m) => ({
      id: m.id,
      formCampoId: m.formCampoId,
      movPagerId: m.movPagerId,
      valor: m.valor
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    MovimentacaoPagerCampos.fromJson = (json) => {
    if (!json) return null;

    return {
        id: json.id,
        formCampoId: json.formCampoId,
        movPagerId: json.movPagerId,
        valor: json.valor
    };
    };

    return MovimentacaoPagerCampos;
};