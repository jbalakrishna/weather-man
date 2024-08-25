import { Location } from "@/components/location/types";
import { mapForecastResponse } from "./mappers";

const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "63cf2e53149145b58da164536242308";

type LocationRequest = {
  latitude: number;
  longitude: number;
};

export async function fetchCurrentWeather({
  latitude,
  longitude,
}: LocationRequest) {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${latitude},${longitude}`
  );
  const data = await response.json();
  return data;
}

export async function fetchWeatherForecast({
  latitude,
  longitude,
}: LocationRequest): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=yes`
  );

  const data = await response.json();
  return mapForecastResponse(data);
}

export async function fetchLocationsAutoComplete(
  query: string
): Promise<Location[]> {
  const response = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
  );
  const data = await response.json();
  return data;
}
