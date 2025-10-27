import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ProprioSetor = sequelize.define(
        "ProprioSetor",
        {
            prpsetcod: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "PRPSETCOD"},
            prpcod: {type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD"},
            setcod: {type: DataTypes.INTEGER, allowNull: false, field: "SETCOD"},
        },
        {
            tableName: "proprio_setor",
            timestamps: false,
            underscored: true,
        }
    );

    ProprioSetor.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (p) => ({
      id: p.prpsetcod,
      proprioId: p.prpcod,
      setorId: p.setcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    ProprioSetor.fromJson = (json) => {
    if (!json) return null;

    return {
        prpsetcod: json.id,
        prpcod: json.proprioId,
        setcod: json.setorId,
    };
    };

    return ProprioSetor;
};