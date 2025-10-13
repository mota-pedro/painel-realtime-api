import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define(
        "SysConfig",
        {
            cfg_parametro: {type: DataTypes.STRING(50), primaryKey: true, allowNull: false, field: "CFG_PARAMETRO"},
            cfg_valor: {type: DataTypes.STRING(500), allowNull: true, field: "CFG_VALOR"},
        },
        {
            tableName: "sys_config",
            timestamps: false,
            underscored: true,
        }
    );
};