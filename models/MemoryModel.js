import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize;

const Memory = db.define(
  "memory",
  {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    speed: DataTypes.STRING,
    channel: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Memory;

(async () => {
  await db.sync();
})();
