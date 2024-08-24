import { Fragment, useEffect, useState } from "react";

import * as Location from "expo-location";
import useWeatherStore from "../weather/store";
import { ErrorDenied, ErrorGeneric } from "./constants";

const LocationDetector = () => {
  const [error, setError] = useState<LocationError | null>(null);
  const store = useWeatherStore();
  const { location } = useWeatherStore();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError(ErrorDenied);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        store.setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        store.fetchWeather();
      } catch (error) {
        setError(ErrorGeneric);
      }
    })();
  }, []);

  let text = "Waiting...";
  if (error) {
    text = error.message;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return <Fragment></Fragment>;
};

export default LocationDetector;
