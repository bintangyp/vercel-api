import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const GamingChair = db.define(
  "gaming-chair",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default GamingChair;

(async () => {
  await db.sync();
})();
