import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Funcionario = sequelize.define(
    "Funcionario",
    {
      funcod: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: "FUNCOD" },
      fundes: { type: DataTypes.STRING(30), allowNull: true, field: "FUNDES" },
      funcpf: { type: DataTypes.STRING(14), allowNull: true, field: "FUNCPF" },
      funrg: { type: DataTypes.STRING(20), allowNull: true, field: "FUNRG" },
      funend: { type: DataTypes.STRING(200), allowNull: true, field: "FUNEND" },
      funbai: { type: DataTypes.STRING(100), allowNull: true, field: "FUNBAI" },
      funcmp: { type: DataTypes.STRING(15), allowNull: true, field: "FUNCMP" },
      funnum: { type: DataTypes.STRING(6), allowNull: true, field: "FUNNUM" },
      funmun: { type: DataTypes.STRING(100), allowNull: true, field: "FUNMUN" },
      funuf: { type: DataTypes.CHAR(2), allowNull: true, field: "FUNUF" },
      funcep: { type: DataTypes.STRING(10), allowNull: true, field: "FUNCEP" },
      funcodibge: { type: DataTypes.CHAR(7), allowNull: true, field: "FUNCODIBGE" },
      funtel: { type: DataTypes.STRING(12), allowNull: true, field: "FUNTEL" },
      funemail: { type: DataTypes.STRING(100), allowNull: true, field: "FUNEMAIL" },
      funfotdoc: { type: DataTypes.BLOB("long"), allowNull: true, field: "FUNFOTDOC" },
      funobs: { type: DataTypes.STRING(100), allowNull: true, field: "FUNOBS" },
      funlog: { type: DataTypes.STRING(20), allowNull: true, field: "FUNLOG" },
      funsen: { type: DataTypes.STRING(100), allowNull: true, field: "FUNSEN" },
      fundatcad: { type: DataTypes.DATE, allowNull: true, field: "FUNDATCAD" },
      prpcod: { type: DataTypes.INTEGER, allowNull: false, field: "PRPCOD" },
      funati: { type: DataTypes.CHAR(1), allowNull: false, defaultValue: "N", field: "FUNATI" },
    },
    {
      tableName: "funcionario",
      timestamps: false,
      underscored: true,
    }
  );

  Funcionario.mapearParaJson = (dados) => {
    if (!dados) return null;

    const mapear = (f) => ({
      id: f.funcod,
      nome: f.fundes,
      cpf: f.funcpf,
      rg: f.funrg ?? null,
      endereco: f.funend,
      bairro: f.funbai,
      complemento: f.funcmp,
      numero: f.funnum,
      municipio: f.funmun,
      uf: f.funuf,
      cep: f.funcep,
      codigoIbge: f.funcodibge ?? null,
      telefone: f.funtel,
      email: f.funemail,
      fotoDocumento: f.funfotdoc ?? null,
      observacao: f.funobs ?? null,
      login: f.funlog,
      senha: f.funsen,
      dataCadastro: f.fundatcad ?? null,
      ativo: f.funati === "S",
      empresaId: f.prpcod,
    });

    return Array.isArray(dados) ? dados.map(mapear) : mapear(dados);
  };

  Funcionario.fromJson = (json) => {
    if (!json) return null;

    return {
      funcod: json.id,
      fundes: json.nome,
      funcpf: json.cpf,
      funrg: json.rg ?? null,
      funend: json.endereco,
      funbai: json.bairro,
      funcmp: json.complemento,
      funnum: json.numero,
      funmun: json.municipio,
      funuf: json.uf,
      funcep: json.cep,
      funcodibge: json.codigoIbge ?? null,
      funtel: json.telefone,
      funemail: json.email,
      funfotdoc: json.fotoDocumento ?? null,
      funobs: json.observacao ?? null,
      funlog: json.login,
      funsen: json.senha,
      fundatcad: json.dataCadastro ?? new Date().toISOString().split("T")[0],
      funati: json.ativo ? "S" : "N",
      prpcod: json.empresaId
    };
  };

  return Funcionario;
};
