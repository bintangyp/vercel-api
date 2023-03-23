import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "LO5Lj526P1b0fOaWkLIq", {
  host: "containers-us-west-180.railway.app",
  port: "7463",
  dialect: "mysql",
});

export default db;
