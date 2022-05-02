import { Application } from "express";
import expressLoader from "./express";
import mysqlLoader from "./mysql";

export interface LoaderParams {
  expressApp: Application;
}

export default async ({ expressApp }: LoaderParams) => {
  expressLoader(expressApp);
  await mysqlLoader();
};
