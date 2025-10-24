import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ProprioFuncionario = sequelize.define(
        "ProprioFuncionario",
        {
            prpfuncod: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "PRPFUNCOD"},
            prpcod: {type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD"},
            funcod: {type: DataTypes.INTEGER, allowNull: false, field: "FUNCOD"},
        },
        {
            tableName: "proprio_funcionario",
            timestamps: false,
            underscored: true,
        }
    );

    ProprioFuncionario.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (p) => ({
      id: p.prpfuncod,
      empresaId: p.prpcod,
      funcionarioId: p.funcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

    ProprioFuncionario.fromJson = (json) => {
    if (!json) return null;

    return {
        prpfuncod: json.id,
        prpcod: json.empresaId,
        funcod: json.funcionarioId,
    };
    };

    return ProprioFuncionario;
};