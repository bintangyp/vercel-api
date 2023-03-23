import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Psu = db.define(
  "psu",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    watt: DataTypes.STRING,
    sertifikasi: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Psu;

(async () => {
  await db.sync();
})();
