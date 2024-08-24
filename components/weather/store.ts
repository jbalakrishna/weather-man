import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { fetchWeatherForecast } from "../../lib/network/apis";
import { Location } from "../location/types";

interface WeatherStore {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  location: Location | null;

  setLocation: (location: Location) => void;

  fetchWeather: () => Promise<void>;

  clearWeather: () => void;
}

const useWeatherStore = create<WeatherStore>(
  persist(
    (set, get) => ({
      weather: null,
      loading: false,
      error: null,
      location: null,

      setLocation(location: any) {
        set({ location });
      },

      fetchWeather: async () => {
        set({ loading: true, error: null });

        try {
          const payload = get().location;
          if (!payload) return;
          const weatherForeCastResponse = await fetchWeatherForecast(payload);
          set({ weather: weatherForeCastResponse, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      clearWeather: () => set({ weather: null, error: null }),
    }),
    {
      name: "current-weather",
      getStorage: () => AsyncStorage,
    }
  ) as StateCreator<WeatherStore, [], []>
);

export default useWeatherStore;
