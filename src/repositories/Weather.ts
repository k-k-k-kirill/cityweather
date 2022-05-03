import WeatherModel from "../models/Weather";
import db from "../db";
import { Op } from "sequelize";
import CityModel from "../models/City";
import ServerError from "../errors/ServerError";

class Weather {
  all = async () => {
    try {
      return await WeatherModel.findAll({
        attributes: ["temp", "humidity", "coordinates"],
        include: [
          {
            model: CityModel,
            attributes: ["name"],
          },
        ],
      });
    } catch (err) {
      throw new ServerError();
    }
  };

  createFromArray = async (items: any[]) => {
    items.forEach(async (item) => {
      try {
        const [city, created] = await CityModel.findOrCreate({
          where: { name: item.city },
        });

        await WeatherModel.create({
          temp: item.temp,
          humidity: item.humidity,
          coordinates: item.coordinates,
          cityId: city.getDataValue("id"),
        });
      } catch (err) {
        throw new ServerError();
      }
    });
  };

  findWithinRadius = async (lon: number, lat: number, radius: number) => {
    try {
      const location = db.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`);
      const distance = db.fn(
        "ST_Distance_Sphere",
        db.col("coordinates"),
        location
      );

      const inRadius = await WeatherModel.findAll({
        order: distance,
        where: db.where(distance, { [Op.lte]: radius }),
        include: [
          {
            model: CityModel,
            attributes: ["name"],
          },
        ],
      });

      return inRadius;
    } catch (err) {
      throw new ServerError();
    }
  };
}

export default Weather;
