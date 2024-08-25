import {
  ConditionAttributesColorData,
  DayWeatherAttributesImperial,
  DayWeatherAttributesUniversal,
} from "@/components/weather/constants";
import { mapDaysData } from "@/lib/network/mappers";
import { find } from "lodash";

jest.mock("moment-timezone", () => {
  const moment = jest.requireActual("moment-timezone");
  return moment;
});

jest.mock("lodash", () => {
  const lodash = jest.requireActual("lodash");
  return lodash;
});

describe("mapDaysData test", () => {
  const mockForecastInput = {
    forecastday: [
      {
        date_epoch: 1724575500,
        day: {
          condition: {
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003,
          },
          mintemp_c: 25.0,
          mintemp_f: 77.0,
          maxtemp_c: 25.0,
          maxtemp_f: 77.0,
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
          chance_of_rain: 0,
          chance_of_snow: 0,
        },
      },
    ],
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

  const dayResult = mapDaysData(mockForecastInput, mockLocation)[0];

  console.log(dayResult);
  it("should pick the correct attributes from the current data", () => {
    [
      ...Object.values(DayWeatherAttributesImperial),
      ...Object.values(DayWeatherAttributesUniversal),
    ].map((key) => {
      expect(dayResult).toHaveProperty(key);
    });
  });

  it("should ignore the wanted attributes from the current data", () => {
    ["invalid_key_1", "invalid_key_2", "invalid_key_3"].map((key) => {
      expect(dayResult).not.toHaveProperty(key);
    });
  });

  it("should calculate day of the day week precisely", () => {
    expect(dayResult.dayOfWeek).toEqual("Sunday");
  });
});
