import { UploadedFile } from "express-fileupload";
import WeatherModel from "../models/Weather";
import Upload from "./Upload";
import db from "../db";
import { Op } from "sequelize";

class Weather {
  populateFromFile = async (file: UploadedFile) => {
    const uploadService = new Upload();
    const uploadRecords = uploadService.convertToJSON(file);

    uploadRecords.map(async (item: any) => {
      try {
        const point = { type: "Point", coordinates: [item.lon, item.lat] };

        await WeatherModel.create({
          city: item.city,
          coordinates: point,
          temp: item.temp,
          humidity: item.humidity,
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  getAll = async () => {
    try {
      return await WeatherModel.findAll();
    } catch (err) {
      console.log(err);
    }
  };

  findByCoordinates = async (lon: any, lat: any, radius: any) => {
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
      });

      return inRadius;
    } catch (err) {
      console.log(err);
    }
  };
}

export default Weather;
