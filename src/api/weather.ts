import express, { Router, Request, Response } from "express";
import Weather from "../models/Weather";
import { UploadedFile } from "express-fileupload";
import WeatherService from "../services/Weather";
import { query } from "express-validator";

const weather: Router = express.Router();

weather.get("/", async (req: Request, res: Response) => {
  const weatherData = await Weather.findAll();

  res.send(weatherData);
});

weather.post("/", async (req: Request, res: Response) => {
  if (!req.files) {
    // throw new RequestValidationError([]);
  } else {
    try {
      let weatherData = req.files.weather as UploadedFile;

      const weatherService = new WeatherService();
      await weatherService.populateFromFile(weatherData);

      //send response
      res.send({
        message: "File is uploaded",
        data: {
          name: weatherData.name,
          mimetype: weatherData.mimetype,
          size: weatherData.size,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
});

weather.get("/search", async (req: Request, res: Response) => {
  try {
    const { lat } = req.query;
    const { lon } = req.query;
    const radius = req.query.radius ?? 50;

    const weatherService = new WeatherService();
    const weatherData = await weatherService.findByCoordinates(
      lon,
      lat,
      radius
    );

    res.send(weatherData);
  } catch (err) {
    console.log(err);
  }
});

export default weather;
