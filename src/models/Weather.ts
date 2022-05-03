import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db";

const Weather = db.define("weather", {
  city: {
    type: DataTypes.STRING,
  },
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

(async () => {
  try {
    await db.sync();
  } catch (err) {
    console.log(err);
  }
})();

export default Weather;
