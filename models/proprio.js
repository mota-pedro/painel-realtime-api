import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Proprio = sequelize.define(
    "Proprio",
    {
      prpcod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "PRPCOD" },
      prpdes: { type: DataTypes.STRING(60), allowNull: true, field: "PRPDES" },
      prpfan: { type: DataTypes.STRING(30), allowNull: true, field: "PRPFAN" },
      prpcgc: { type: DataTypes.STRING(14), allowNull: true, field: "PRPCGC" },
      prpierg: { type: DataTypes.STRING(18), allowNull: true, field: "PRPIERG" },
      prpincmun: { type: DataTypes.STRING(18), allowNull: true, field: "PRPINCMUN" },
      prpend: { type: DataTypes.STRING(40), allowNull: true, field: "PRPEND" },
      prpcmp: { type: DataTypes.STRING(15), allowNull: true, field: "PRPCMP" },
      prpnum: { type: DataTypes.STRING(6), allowNull: true, field: "PRPNUM" },
      prpbai: { type: DataTypes.STRING(20), allowNull: true, field: "PRPBAI" },
      prpmun: { type: DataTypes.STRING(40), allowNull: true, field: "PRPMUN" },
      prpuf: { type: DataTypes.CHAR(2), allowNull: true, field: "PRPUF" },
      prpcep: { type: DataTypes.STRING(10), allowNull: true, field: "PRPCEP" },
      prpcodibge: { type: DataTypes.CHAR(7), allowNull: true, field: "PRPCODIBGE" },
      prptel: { type: DataTypes.STRING(12), allowNull: true, field: "PRPTEL" },
      prpemail: { type: DataTypes.STRING(100), allowNull: true, field: "PRPEMAIL" },
      prpresp: { type: DataTypes.STRING(40), allowNull: true, field: "PRPRESP" },
      prplogo: { type: DataTypes.BLOB("long"), allowNull: true, field: "PRPLOGO" },
      prpobs: { type: DataTypes.STRING(120), allowNull: true, field: "PRPOBS" },
      prpdatcad: { type: DataTypes.DATE, allowNull: true, field: "PRPDATCAD" },
      modpnlcod: { type: DataTypes.INTEGER, allowNull: true, field: "MODPNLCOD" },
    },
    {
      tableName: "proprio",
      timestamps: false,
      underscored: true,
    }
  );

  Proprio.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (p) => ({
      id: p.prpcod,
      nome: p.prpdes,
      nomeFantasia: p.prpfan ?? null,
      cnpj: p.prpcgc,
      rgIe: p.prpierg ?? null,
      inscricaoMunicipal: p.prpincmun ?? null,
      endereco: p.prpend,
      complemento: p.prpcmp,
      numero: p.prpnum,
      bairro: p.prpbai,
      municipio: p.prpmun,
      uf: p.prpuf,
      cep: p.prpcep,
      codigoIbge: p.prpcodibge ?? null,
      telefone: p.prptel,
      email: p.prpemail,
      responsavel: p.prpresp ?? null,
      logo: p.prplogo ?? null,
      observacao: p.prpobs ?? null,
      dataCadastro: p.prpdatcad ?? null,
      modeloPainelId: p.modpnlcod ?? null,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  Proprio.fromJson = (json) => {
    if (!json) return null;

    return {
      prpcod: json.id,
      prpdes: json.nome,
      prpfan: json.nomeFantasia ?? null,
      prpcgc: json.cnpj,
      prpierg: json.rgIe ?? null,
      prpincmun: json.inscricaoMunicipal ?? null,
      prpend: json.endereco,
      prpcmp: json.complemento,
      prpnum: json.numero,
      prpbai: json.bairro,
      prpmun: json.municipio,
      prpuf: json.uf,
      prpcep: json.cep,
      prpcodibge: json.codigoIbge ?? null,
      prptel: json.telefone,
      prpemail: json.email,
      prpresp: json.responsavel ?? null,
      prplogo: json.logo ?? null,
      prpobs: json.observacao ?? null,
      prpdatcad: json.dataCadastro ?? new Date().toISOString().split("T")[0],
      modpnlcod: json.modeloPainelId ?? null,
    };
  };

  return Proprio;
};
