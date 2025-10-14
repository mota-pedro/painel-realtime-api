import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define(
        "ModeloPainel",
        {
            modpnlcod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "MODPNLCOD" },
            modpnldes: { type: DataTypes.STRING(40), allowNull: true, field: "MODPNLDES" },
            modpnlfrmcodmsg: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 2, field: "MODPNLFRMCODMSG" },
            modpnlfrmcodbot: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 3, field: "MODPNLFRMCODBOT" },
        },
        {
            tableName: "modelo_painel",
            timestamps: false,
            underscored: true,
        }
    );
};