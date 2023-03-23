import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Mouse = db.define(
  "mouse",
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    koneksi: DataTypes.STRING,
    button: DataTypes.STRING,
    rgb: DataTypes.STRING,
    resolusi: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Mouse;

(async () => {
  await db.sync();
})();
