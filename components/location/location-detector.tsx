import { Fragment, useEffect } from "react";

import {
  LocationErrorDenied,
  LocationErrorGeneric,
} from "@/components/common/errors";
import * as Location from "expo-location";
import useWeatherStore from "../weather/store";

const LocationDetector = () => {
  const store = useWeatherStore();
  const { location } = useWeatherStore();
  useEffect(() => {
    (async () => {
      if (location && !store.error) return;
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        store.setError(LocationErrorDenied);
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
        store.setError(LocationErrorGeneric);
      }
    })();
  }, []);

  return <Fragment></Fragment>;
};

export default LocationDetector;
