import {
  ConditionAttributesColorData,
  CurrentWeatherAttributesImperial,
  CurrentWeatherAttributesUniversal,
} from "@/components/weather/constants";
import { mapCurrentData } from "@/lib/network/mappers";
import { find } from "lodash";

jest.mock("moment-timezone", () => {
  const moment = jest.requireActual("moment-timezone");
  return moment;
});

jest.mock("lodash", () => {
  const lodash = jest.requireActual("lodash");
  return lodash;
});

describe("mapCurrentData test", () => {
  const mockCurrentInput = {
    last_updated_epoch: 1724575500,
    condition: {
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 1003,
    },
    temp_c: 25.0,
    temp_f: 77.0,
    dewpoint_c: 22.0,
    feelslike_c: 24.0,
    cloud: 5,
    humidity: 30,
    is_day: 1,
    wind_kph: 20,
    windchill_c: 19,
    last_updated: "2024-08-25 02:15 PM",
    dewpoint_f: 70,
    feelslike_f: 76,
    wind_mph: 11,
    windchill_f: 65,
    invalid_key_1: 1,
    invalid_key_2: 2,
    invalid_key_3: 3,
  };

  const mockLocation = {
    tz_id: "Asia/Kolkata",
  };

  const matchingConditionColors = find(
    ConditionAttributesColorData,
    (data) => data.code === 1003
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  const results = mapCurrentData(mockCurrentInput, mockLocation);

  it("should pick the correct attributes from the current data", () => {
    [
      ...Object.values(CurrentWeatherAttributesImperial),
      ...Object.values(CurrentWeatherAttributesUniversal),
    ].map((key) => {
      expect(results).toHaveProperty(key);
    });
  });

  it("should ignore the wanted attributes from the current data", () => {
    ["invalid_key_1", "invalid_key_2", "invalid_key_3"].map((key) => {
      expect(results).not.toHaveProperty(key);
    });
  });

  it("should calculate time hour precisely", () => {
    expect(results.timeHour).toEqual(14);
  });

  it("should generate icon correctly", () => {
    expect(results.condition.icon).toEqual(
      "https://cdn.weatherapi.com/weather/128x128/day/116.png"
    );
  });

  it("should pick colors data correctly", () => {
    expect(results.condition.dayColors).toEqual(
      matchingConditionColors?.dayColors
    );
    expect(results.condition.nightColors).toEqual(
      matchingConditionColors?.nightColors
    );
  });
});
