import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const VgaCard = db.define(
  "vga-card",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    memoryType: DataTypes.STRING,
    memorySize: DataTypes.STRING,
    reqPsu: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default VgaCard;

(async () => {
  await db.sync();
})();
