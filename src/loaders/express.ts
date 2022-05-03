import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";
import router from "../api/index";
import cookieParser from "cookie-parser";
import NotFoundError from "../errors/NotFoundError";
import errorHandler from "../middlewares/errorHandler";
import fileUpload from "express-fileupload";

export default (app: Application) => {
  app.use(
    fileUpload({
      createParentPath: true,
    })
  );

  app.use(express.json());
  app.enable("trust proxy");

  const corsConfig = {
    origin: true,
    credentials: true,
  };

  app.use(cors(corsConfig));
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use("/", router);

  app.all("*", () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
