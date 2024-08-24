import { Fragment, useEffect, useState } from "react";

import * as Location from "expo-location";
import useWeatherStore from "../weather/store";
import { ErrorDenied, ErrorGeneric } from "./constants";
import { LocationError } from "./types";

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
        const storingLocation = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };
        store.setLocation(storingLocation);
        await store.fetchWeather(storingLocation);
      } catch (error) {
        setError(ErrorGeneric);
      }
    })();
  }, []);

  return <Fragment></Fragment>;
};

export default LocationDetector;
