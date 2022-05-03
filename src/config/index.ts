import dotenv from "dotenv";

dotenv.config();

export default {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,

  NODE_DOCKER_PORT: process.env.NODE_DOCKER_PORT,
  NODE_LOCAL_PORT: process.env.NODE_LOCAL_PORT,

  NODE_ENV: process.env.NODE_ENV,
};
