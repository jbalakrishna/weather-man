import mockForecastResponse from "@/__mocks__/mocks";
import { ErrorType } from "@/components/common/errors";
import useWeatherStore from "@/components/weather/store";
import { fetchWeatherForecast } from "@/lib/network/apis";
import { mapForecastResponse } from "@/lib/network/mappers";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  multiSet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  getItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(JSON.stringify({}));
    });
  }),
  multiGet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(["one", "two", "three"]);
    });
  }),
}));

jest.mock("@/lib/network/apis", () => ({
  fetchWeatherForecast: jest.fn(),
}));

describe("useWeatherStore", () => {
  beforeEach(() => {
    jest.mocked(fetchWeatherForecast).mockReset();
  });

  test("initially store is in loading state", () => {
    const { loading } = useWeatherStore.getState();
    expect(loading).toBeTruthy();
  });

  test("initially error is null", () => {
    const { error } = useWeatherStore.getState();
    expect(error).toBeNull();
  });

  test("fetching weather without location gives necessary error", async () => {
    await useWeatherStore.getState().fetchWeather();
    const { error } = useWeatherStore.getState();
    expect(error?.message).toEqual("No location found");
  });

  test("fetching weather with location gives mocked weather", async () => {
    jest.mocked(fetchWeatherForecast).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mapForecastResponse(mockForecastResponse));
      });
    });
    useWeatherStore.getState().setLocation({
      latitude: 1,
      longitude: 1,
    });
    await useWeatherStore.getState().fetchWeather();
    const { error } = useWeatherStore.getState();
    expect(error).toBeNull();
  });

  test("fetching weather and clearing weather", async () => {
    jest.mocked(fetchWeatherForecast).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mapForecastResponse(mockForecastResponse));
      });
    });
    useWeatherStore.getState().setLocation({
      latitude: 1,
      longitude: 1,
    });
    await useWeatherStore.getState().fetchWeather();
    useWeatherStore.getState().clearWeather();
    const { weather } = useWeatherStore.getState();
    expect(weather).toBeNull();
  });

  test("fetching weather api error, gives generic error state", async () => {
    jest.mocked(fetchWeatherForecast).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(new Error("test error"));
      });
    });
    await useWeatherStore.getState().fetchWeather();
    const { weather, error } = useWeatherStore.getState();
    expect(weather).toBeNull();
    expect(error?.message).toEqual("test error");
  });

  test("fetching after an error state, resets the error state", async () => {
    jest.mocked(fetchWeatherForecast).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mapForecastResponse(mockForecastResponse));
      });
    });
    useWeatherStore.getState().setError({
      error: "test error",
      errorType: ErrorType.GENERIC,
      message: "test error",
    });
    await useWeatherStore.getState().fetchWeather();
    useWeatherStore.getState().clearError();
    const { error } = useWeatherStore.getState();
    expect(error).toBeNull();
  });
});
