import config from "../config";
import { Sequelize } from "sequelize";

export default new Sequelize(
  config.MYSQL_DATABASE || "",
  config.MYSQL_USER || "",
  config.MYSQL_PASSWORD || "",
  {
    host: config.NODE_ENV === "development" ? "localhost" : config.MYSQL_HOST,
    port: 3306,
    dialect: "mysql",
    logging: config.NODE_ENV === "production" ? false : console.log,
  }
);
