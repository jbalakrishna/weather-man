import { Error } from "./types";

export enum ErrorType {
  LOCATION_DENIED = 1,
  LOCATION_GENERIC = 2,
  GENERIC = 3,
  WEATHER_FETCH_ERROR = 4,
}

export const WeatherFetchError: Error = {
  error: "Weather fetch error",
  message: "Unable to fetch weather now, please try again later.",
  errorType: ErrorType.WEATHER_FETCH_ERROR,
};

export const LocationErrorDenied: Error = {
  error: "denied",
  errorType: ErrorType.LOCATION_DENIED,
  message:
    "Permission was denied, please try again or open settings to allow the app to access your location.",
};

export const LocationErrorGeneric: Error = {
  error: "generic",
  errorType: ErrorType.LOCATION_GENERIC,
  message: "Unable to fetch location now, please try again later.",
};
