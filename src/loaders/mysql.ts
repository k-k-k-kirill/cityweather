import db from "../db";

export default async () => {
  try {
    await db.authenticate();

    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
