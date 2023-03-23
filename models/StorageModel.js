import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Storage = db.define(
  "storage",
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    slotType: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Storage;

(async () => {
  await db.sync();
})();
