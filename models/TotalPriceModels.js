import db from "../config/Database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;

const TotalPrice = db.define(
  "total_price_temp",
  {
    nama: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default TotalPrice;

(async () => {
  await db.sync();
})();
