import {
  ConditionAttributesColorData,
  HourWeatherAttributesImperial,
  HourWeatherAttributesUniversal,
} from "@/components/weather/constants";
import { mapHoursData } from "@/lib/network/mappers";
import { find } from "lodash";

jest.mock("moment-timezone", () => {
  const moment = jest.requireActual("moment-timezone");
  return moment;
});

jest.mock("lodash", () => {
  const lodash = jest.requireActual("lodash");
  return lodash;
});

describe("mapHoursData test", () => {
  const mockForecastInput = {
    forecastday: [
      {
        date_epoch: 1724575500,
        hour: [
          {
            time: "02:00",
            time_epoch: 1724567400,
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
            chance_of_rain: 0,
            chance_of_snow: 0,
          },
        ],
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

  const hourResult = mapHoursData(mockForecastInput, mockLocation)[0];

  it("should pick the correct attributes from the current data", () => {
    [
      ...Object.values(HourWeatherAttributesImperial),
      ...Object.values(HourWeatherAttributesUniversal),
    ].map((key) => {
      expect(hourResult).toHaveProperty(key);
    });
  });

  it("should ignore the wanted attributes from the current data", () => {
    ["invalid_key_1", "invalid_key_2", "invalid_key_3"].map((key) => {
      expect(hourResult).not.toHaveProperty(key);
    });
  });

  it("should calculate time hour precisely", () => {
    expect(hourResult.timeHour).toEqual(12);
  });
});
