import { DataTypes } from "sequelize";
import db from "../db";
import City from "./City";

const Weather = db.define("weather", {
  coordinates: {
    type: DataTypes.GEOMETRY("POINT"),
    allowNull: false,
  },
  temp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.FLOAT,
  },
});

Weather.belongsTo(City);
City.hasMany(Weather);

export default Weather;
