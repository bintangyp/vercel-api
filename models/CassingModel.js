import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Cassing = db.define(
  "cassing",
  {
    name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    formFactor: DataTypes.STRING,
    frontPanel: DataTypes.TEXT,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Cassing;

(async () => {
  await db.sync();
})();
