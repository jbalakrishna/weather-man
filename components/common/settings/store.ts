import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  units: "metric" | "imperial";
  offlineMode: boolean;

  getUnits: () => string;
  setUnits: (units: "metric" | "imperial") => void;
  getTemperatureSuffix: () => string;
  getSpeedSuffix: () => string;

  setOfflineMode: (offlineMode: boolean) => void;
}

const useSettingsStore = create<SettingsStore>(
  persist(
    (set, get) => ({
      units: "metric",
      offlineMode: false,

      getUnits: () => get().units,
      setUnits: (units: "metric" | "imperial") => set({ units }),
      getTemperatureSuffix: () => (get().units === "metric" ? "°C" : "°F"),
      getSpeedSuffix: () => (get().units === "metric" ? "kmph" : "mph"),

      setOfflineMode: (offlineMode: boolean) => set({ offlineMode }),
    }),
    {
      name: "current-weather",
      getStorage: () => AsyncStorage,
    }
  ) as StateCreator<SettingsStore, [], []>
);

export default useSettingsStore;
