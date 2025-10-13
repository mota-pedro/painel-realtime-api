import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define(
        "ProprioFuncionario",
        {
            prpfuncod: {type: DataTypes.CHAR(6), primaryKey: true, allowNull: false, field: "PRPFUNCOD"},
            prpcod: {type: DataTypes.CHAR(4), allowNull: false, field: "PRPCOD"},
            funcod: {type: DataTypes.CHAR(6), allowNull: false, field: "FUNCOD"},
        },
        {
            tableName: "proprio_funcionario",
            timestamps: false,
            underscored: true,
        }
    );
};