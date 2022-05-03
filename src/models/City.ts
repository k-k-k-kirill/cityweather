import { DataTypes } from "sequelize";
import db from "../db";
import Weather from "./Weather";

const City = db.define("city", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default City;
