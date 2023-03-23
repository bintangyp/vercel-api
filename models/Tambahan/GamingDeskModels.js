import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const GamingDesk = db.define(
  "gaming-desk",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default GamingDesk;

(async () => {
  await db.sync();
})();
