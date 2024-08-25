import ErrorScreen from "@/components/common/error-component";
import LoadingScreen from "@/components/common/loading-component";
import React from "react";
import { View } from "react-native";
import LocationDetector from "../components/location/location-detector";
import WeatherContainer from "../components/weather/container/weather-container";
import useWeatherStore from "../components/weather/store";
import "./global.css";

export default function App() {
  const store = useWeatherStore();

  const handleRetry = () => {
    store.fetchWeather();
  };

  return (
    <View className="flex-1">
      <LocationDetector />
      {store.weather && <WeatherContainer data={store.weather} />}
      {!store.weather && (
        <ErrorScreen error={store.error} handleRetry={handleRetry} />
      )}
      <LoadingScreen visible={store.loading} />
    </View>
  );
}
