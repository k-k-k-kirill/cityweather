import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db";

const Weather = db.define("weather", {
  city: {
    type: DataTypes.STRING,
  },
  coordinates: {
    type: DataTypes.GEOGRAPHY("POINT"),
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.FLOAT,
  },
});

export default Weather;
