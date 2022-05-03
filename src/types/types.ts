export interface WeatherData {
  city: string;
  lat: number;
  lon: number;
  temp: number;
  humidity: number;
}

export interface WeatherRecord {
  city: string;
  temp: number;
  coordinates: Point;
  humidity: number;
}

export interface Point {
  type: string;
  coordinates: number[];
}

export enum TemperatureUnits {
  Fahrenheit = "f",
  Celsius = "c",
}
