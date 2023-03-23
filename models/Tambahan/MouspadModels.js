import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Mousepad = db.define(
  "mousepad",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    size: DataTypes.STRING,
    ketebalan: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Mousepad;

(async () => {
  await db.sync();
})();
