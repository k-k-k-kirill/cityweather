import express, { Router, Request, Response } from "express";
import weatherService from "../services/Weather";
import { body } from "express-validator";
import validateRequest from "../helpers/validateRequest";
import Weather from "../models/Weather";

const weather: Router = express.Router();

weather.get("/", async (req: Request, res: Response) => {
  const weatherData = await Weather.findAll();

  res.send(weatherData);
});

export default weather;
