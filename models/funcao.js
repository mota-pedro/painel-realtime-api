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
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
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
      dispositivo: f.fncdis ?? null,
      botao: f.fncbot ?? null,
      dataCadastro: f.fncdatcad ?? null,
      setorId: f.setcod,
      areaId: f.arecod ?? null,
      pessoaId: f.pescod ?? null,
      tempoExpiracao: f.fnctmpexp ?? null,
      botaoFechamento: f.fncbotfec,
      digitoVerificador: f.fncdigver ?? null,
      empresaId: f.prpcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  Funcao.fromJson = (json) => {
    if (!json) return null;

    return {
      fnccod: json.id,
      fncdes: json.nome,
      fncdis: json.dispositivo ?? null,
      fncbot: json.botao ?? null,
      fncdatcad: json.dataCadastro ?? null,
      setcod: json.setorId,
      arecod: json.areaId ?? null,
      pescod: json.pessoaId ?? null,
      fnctmpexp: json.tempoExpiracao ?? null,
      fncbotfec: json.botaoFechamento,
      fncdigver: json.digitoVerificador ?? null,
      prpcod: json.empresaId,
    };
  };

  return Funcao;
};