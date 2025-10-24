import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Funcao = sequelize.define(
    "Funcao",
    {
      fnccod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "FNCCOD" },
      fncdes: { type: DataTypes.STRING(40), allowNull: true, field: "FNCDES" },
      fncdis: { type: DataTypes.CHAR(3), allowNull: true, field: "FNCDIS" },
      fncbot: { type: DataTypes.CHAR(2), allowNull: true, field: "FNCBOT" },
      fncdatcad: { type: DataTypes.DATE, allowNull: true, field: "FNCDATCAD" },
      setcod: { type: DataTypes.INTEGER, allowNull: true, field: "SETCOD" },
      arecod: { type: DataTypes.CHAR(5), allowNull: true, field: "ARECOD" },
      pescod: { type: DataTypes.CHAR(5), allowNull: true, field: "PESCOD" },
      fnctmpexp: { type: DataTypes.TIME, allowNull: true, field: "FNCTMPEXP" },
      fncbotfec: { type: DataTypes.CHAR(1), allowNull: true, field: "FNCBOTFEC" },
      fncdigver: { type: DataTypes.CHAR(3), allowNull: true, field: "FNCDIGVER" },
    },
    {
      tableName: "funcao",
      timestamps: false,
      underscored: true,
    }
  );

  Funcao.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (f) => ({
      id: f.fnccod,
      nome: f.fncdes,
      dispositivo: f.fncdis,
      botao: f.fncbot,
      dataCadastro: f.fncdatcad,
      setorId: f.setcod,
      areaId: f.arecod,
      pessoaId: f.pescod,
      tempoExpiracao: f.fnctmpexp,
      botaoFechamento: f.fncbotfec,
      digitoVerificador: f.fncdigver,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  Funcao.fromJson = (json) => {
    if (!json) return null;

    return {
      fnccod: json.id,
      fncdes: json.nome,
      fncdis: json.dispositivo,
      fncbot: json.botao,
      fncdatcad: json.dataCadastro,
      setcod: json.setorId,
      arecod: json.areaId,
      pescod: json.pessoaId,
      fnctmpexp: json.tempoExpiracao,
      fncbotfec: json.botaoFechamento,
      fncdigver: json.digitoVerificador,
    };
  };

  return Funcao;
};