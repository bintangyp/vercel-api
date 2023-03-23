import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Speaker = db.define(
  "speaker",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    koneksi: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Speaker;

(async () => {
  await db.sync();
})();
