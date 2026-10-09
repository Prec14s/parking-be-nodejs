import { Sequelize } from "sequelize";

const connection = new Sequelize("parking", "root", "rivaldocoding", {
  host: "localhost",
  dialect: "mysql",
});

export default connection;