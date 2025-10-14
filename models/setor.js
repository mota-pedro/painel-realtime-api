import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define(
        "Setor",
        {
            setcod: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "SETCOD"},
            setdes: {type: DataTypes.STRING(40), allowNull: true, field: "SETDES"},
            setdatcad: {type: DataTypes.DATE, allowNull: true, field: "SETDATCAD"},
        },
        {
            tableName: "setor",
            timestamps: false,
            underscored: true,
        }
    );
};