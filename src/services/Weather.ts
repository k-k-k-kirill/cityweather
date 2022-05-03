import { UploadedFile } from "express-fileupload";
import WeatherRepository from "../repositories/Weather";
import Upload from "./Upload";
import {
  WeatherData,
  WeatherRecord,
  Point,
  TemperatureUnits,
} from "../types/types";

class Weather {
  populateFromFile = async (file: UploadedFile): Promise<void> => {
    const uploadService = new Upload();
    const weatherInput = uploadService.convertToJSON(file);
    const weatherRepository = new WeatherRepository();
    const weatherRecords = this.getRecordsFromInput(weatherInput);

    await weatherRepository.createFromArray(weatherRecords);
  };

  getRecordsFromInput = (input: WeatherData[]): WeatherRecord[] => {
    return input.map((item: WeatherData) => {
      const point: Point = { type: "Point", coordinates: [item.lon, item.lat] };

      return {
        city: item.city,
        coordinates: point,
        temp: item.temp,
        humidity: item.humidity,
      };
    });
  };

  getAll = async (unit = TemperatureUnits.Celsius): Promise<WeatherData[]> => {
    const weatherRepository = new WeatherRepository();
    const weatherRecords = await weatherRepository.all();
    return this.normalizeResponse(weatherRecords, unit);
  };

  findByCoordinates = async (
    lon: any,
    lat: any,
    radius: any,
    unit = TemperatureUnits.Celsius
  ): Promise<WeatherData[]> => {
    const weatherRepository = new WeatherRepository();
    const weatherRecords = await weatherRepository.findWithinRadius(
      lon,
      lat,
      radius
    );

    return this.normalizeResponse(weatherRecords, unit);
  };

  normalizeResponse = (records: any, unit: string): WeatherData[] => {
    return records.map((item: any) => {
      return {
        city: item.city.name,
        lat: item.coordinates.coordinates[1],
        lon: item.coordinates.coordinates[0],
        temp:
          unit === TemperatureUnits.Celsius ? item.temp : item.temp * 1.8 + 32,
        humidity: item.humidity,
        unit: unit.toUpperCase(),
      };
    });
  };
}

export default Weather;
