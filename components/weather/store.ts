import { fetchWeatherForecast } from "@/lib/network/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { ErrorType } from "../common/errors";
import { Error } from "../common/types";
import { Location } from "../location/types";

interface WeatherStore {
  weather: WeatherData | null;
  loading: boolean;
  error: Error | null;
  location: Location | null;

  setLocation: (location: Location) => void;
  fetchWeather: (freshLocation?: Location) => Promise<void>;
  clearWeather: () => void;
  setError: (error: Error) => void;
  clearError: () => void;
}

const genericError = (msg: string): Error => {
  return {
    error: "generic",
    errorType: ErrorType.GENERIC,
    message: msg,
  };
};

const useWeatherStore = create<WeatherStore>(
  persist(
    (set, get) => ({
      weather: null,
      loading: true,
      error: null,
      location: null,

      setLocation(location: any) {
        set({ location, error: null, loading: false });
      },

      fetchWeather: async (freshLocation?: Location) => {
        set({ loading: true, error: null });

        try {
          const payload = freshLocation || get().location;

          if (!payload) return;
          const weatherForeCastResponse = await fetchWeatherForecast(payload);

          set({ weather: weatherForeCastResponse, loading: false });
        } catch (error: any) {
          set({ error: genericError(error.message), loading: false });
        }
      },

      clearWeather: () => set({ weather: null, error: null }),

      setError(error: Error) {
        set({ error, loading: false });
      },

      clearError() {
        set({ error: null, loading: false });
      },
    }),
    {
      name: "current-weather",
      getStorage: () => AsyncStorage,
    }
  ) as StateCreator<WeatherStore, [], []>
);

export default useWeatherStore;
