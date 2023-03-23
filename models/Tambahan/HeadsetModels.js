import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Headset = db.define(
  "headset",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    portKoneksi: DataTypes.STRING,
    panjangKabel: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Headset;

(async () => {
  await db.sync();
})();
