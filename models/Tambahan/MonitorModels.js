import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Monitor = db.define(
  "monitor",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    panel: DataTypes.STRING,
    resolusi: DataTypes.STRING,
    port: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Monitor;

(async () => {
  await db.sync();
})();
