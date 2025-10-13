import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.PG_DATABASE || "panel_realtime",
  process.env.PG_USER || "postgres",
  process.env.PG_PASSWORD || "postgres",
  {
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
    dialect: "postgres",
    dialectOptions:
      process.env.NODE_ENV === "production"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    logging: process.env.NODE_ENV === "production" ? false : console.log,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;
