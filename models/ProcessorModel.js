import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Processor = db.define(
  "processor",
  {
    name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Processor;

(async () => {
  await db.sync();
})();
