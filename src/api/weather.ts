import express, { Router, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import WeatherService from "../services/Weather";
import { query, check } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import { TemperatureUnits } from "../types/types";

const weather: Router = express.Router();

weather.get(
  "/",
  query("unit")
    .isString()
    .isIn([TemperatureUnits.Celsius, TemperatureUnits.Fahrenheit])
    .optional()
    .withMessage("Invalid unit requested."),
  async (req: Request, res: Response) => {
    validateRequest(req);

    const { unit } = req.query;

    const weatherService = new WeatherService();
    const weatherData = await weatherService.getAll(unit as TemperatureUnits);

    res.status(200).send(weatherData);
  }
);

weather.post(
  "/",
  check("file")
    .custom((value, { req }) => {
      if (req.files.weather) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Weather data file was not provided.")
    .custom((value, { req }) => {
      if (req.files.weather.mimetype === "application/json" || req.files.weather.mimetype === "application/octet-stream") {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Wrong file type."),
  async (req: Request, res: Response) => {
    validateRequest(req);

    let weatherData = req.files!.weather as UploadedFile;

    const weatherService = new WeatherService();
    await weatherService.populateFromFile(weatherData);

    //send response
    res.status(200).send({
      message: "File data saved to DB.",
      data: {
        name: weatherData.name,
        mimetype: weatherData.mimetype,
        size: weatherData.size,
      },
    });
  }
);

weather.get(
  "/search",
  [
    query("unit")
      .isString()
      .isIn([TemperatureUnits.Celsius, TemperatureUnits.Fahrenheit])
      .optional()
      .withMessage("Invalid unit requested."),
    query("lat")
      .isNumeric()
      .withMessage("Latitude should be numeric value.")
      .exists()
      .withMessage("Latitude cannot be empty"),
    query("lon")
      .isNumeric()
      .withMessage("Longitude should be numeric value.")
      .exists()
      .withMessage("Longitude cannot be empty")
      .withMessage("Radius should be numeric value."),
    query("radius").isNumeric(),
  ],
  async (req: Request, res: Response) => {
    validateRequest(req);

    const { lat } = req.query;
    const { lon } = req.query;
    const { unit } = req.query;
    const radius = req.query.radius ?? 50;

    const weatherService = new WeatherService();
    const weatherData = await weatherService.findByCoordinates(
      lon,
      lat,
      radius,
      unit as TemperatureUnits
    );

    res.status(200).send(weatherData);
  }
);

export default weather;
