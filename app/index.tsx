import React from "react";
import { View } from "react-native";
import LocationDetector from "../components/location/location-detector";
import WeatherContainer from "../components/weather/container/weather-container";
import useWeatherStore from "../components/weather/store";
import "./global.css";

export default function App() {
  const store = useWeatherStore();

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <LocationDetector />
      {store.weather && <WeatherContainer data={store.weather} />}
    </View>
  );
}
