import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Keyboard = db.define(
  "keyboard",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    koneksi: DataTypes.STRING,
    size: DataTypes.STRING,
    switchType: DataTypes.STRING,
    rgb: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Keyboard;

(async () => {
  await db.sync();
})();
