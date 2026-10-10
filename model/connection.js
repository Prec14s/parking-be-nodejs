import { Sequelize } from "sequelize";

const connection = new Sequelize("parking", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default connection;
