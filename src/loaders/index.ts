import { Application } from "express";
import expressLoader from "./express";

export interface LoaderParams {
  expressApp: Application;
}

export default async ({ expressApp }: LoaderParams) => {
  expressLoader(expressApp);
};
