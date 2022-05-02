import config from "../config";
import { Sequelize } from "sequelize";

export default new Sequelize(
  config.MYSQL_DATABASE || "",
  config.MYSQL_USER || "",
  config.MYSQL_ROOT_PASSWORD || "",
  {
    host: config.NODE_ENV === "development" ? "localhost" : config.MYSQL_HOST,
    dialect: "mysql",
  }
);
