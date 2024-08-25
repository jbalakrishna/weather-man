import ErrorScreen from "@/components/common/error-component";
import ErrorSnackbar from "@/components/common/error-snackbar";
import useIsOffline from "@/components/common/hooks/useIsOffline";
import LoadingScreen from "@/components/common/loading-component";
import LocationSelectionModal from "@/components/location/location-selection-modal";
import { LocationSelectHeader } from "@/components/weather/location-select-header";
import { get, throttle } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import LocationDetector from "../components/location/location-detector";
import WeatherContainer from "../components/weather/container/weather-container";
import useWeatherStore from "../components/weather/store";
import "./global.css";

export default function App() {
  const store = useWeatherStore();
  const { weather } = useWeatherStore();

  const isOffline = useIsOffline();
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const locationText = weather?.location
    ? `${get(weather.location, "name", "")}, ${get(
        weather.location,
        "region",
        ""
      )}`
    : "Select Location";

  const handleLocationModal = () => {
    if (isOffline) return;
    store.clearError();
    setLocationModalVisible(true);
  };
  const handleRefresh = async () => {
    if (isOffline) return;
    store.clearError();
    await store.fetchWeather();
  };

  return (
    <View className="flex-1">
      <LocationDetector />
      <ErrorSnackbar error={store.error} />
      <LocationSelectHeader
        locationText={locationText}
        handleLocationModal={handleLocationModal}
        handleRefresh={handleRefresh}
        timeAgo={get(store.weather, "current.timeAgo", "")}
      />
      {store.weather && (
        <WeatherContainer data={store.weather} error={store.error} />
      )}
      {!store.weather && (
        <ErrorScreen error={store.error} handleRetry={handleRefresh} />
      )}
      <LoadingScreen visible={store.loading} />
      <LocationSelectionModal
        locationText={locationText}
        modalVisible={locationModalVisible}
        onClose={() => {
          throttle(() => setLocationModalVisible(false), 1000, {
            trailing: true,
          })();
        }}
      />
    </View>
  );
}
