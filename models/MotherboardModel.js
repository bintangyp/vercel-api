import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Motherboard = db.define(
  "motherboard",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    motherboardName: DataTypes.STRING,
    motherboardChipset: DataTypes.STRING,
    motherboardVendor: DataTypes.STRING,
    motherboardPrice: DataTypes.STRING,
    motherboardImage: DataTypes.STRING,
    motherboardUrl: DataTypes.STRING,
    processorSocket: DataTypes.STRING,
    memory: DataTypes.STRING,
    memorySlot: DataTypes.STRING,
    sataPort: DataTypes.STRING,
    m2Slot: DataTypes.STRING,
    lanPort: DataTypes.STRING,
    usbPort: DataTypes.STRING,
    display: DataTypes.STRING,
    formFactor: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Motherboard;

(async () => {
  await db.sync();
})();
