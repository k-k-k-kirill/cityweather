import express, { Router, Request, Response } from "express";
import weatherService from "../services/Weather";
import { body } from "express-validator";
import validateRequest from "../helpers/validateRequest";

const weather: Router = express.Router();

export default weather;
