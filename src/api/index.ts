import weatherRouter from "./weather";
import express, { Router } from "express";

const rootRouter: Router = express.Router();

rootRouter.use("/weather", weatherRouter);

export default rootRouter;
