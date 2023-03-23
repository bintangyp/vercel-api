import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize;

const ProcessorList = db.define(
  "processor-list",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    processorFullName: DataTypes.STRING,
    processorVendor: DataTypes.STRING,
    processorType: DataTypes.STRING,
    processorSocket: DataTypes.STRING,
    processorGen: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default ProcessorList;

Users.hasMany(ProcessorList);
ProcessorList.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  await db.sync();
})();
