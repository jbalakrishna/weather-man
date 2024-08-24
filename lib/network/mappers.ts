import {
  ConditionAttributesColorData,
  CurrentWeatherAttributesImperial,
  CurrentWeatherAttributesUniversal,
  DayWeatherAttributesImperial,
  DayWeatherAttributesUniversal,
  HourWeatherAttributesImperial,
  HourWeatherAttributesUniversal,
} from "@/components/weather/constants";
import { find, get, pick, values } from "lodash";
import moment from "moment-timezone";

export const mapForecastResponse = (data: any): WeatherData => {
  const { current, forecast, location } = data;
  const currentData = pick(current, [
    ...values(CurrentWeatherAttributesImperial),
    ...values(CurrentWeatherAttributesUniversal),
  ]) as CurrentWeather;
  const momentTime = moment.unix(current.last_updated_epoch).tz(location.tz_id);
  currentData.timeAgo = `${momentTime.fromNow(true)} ago`;
  currentData.timeHour =
    (momentTime.minutes() >= 40 ? momentTime.hour() + 1 : momentTime.hour()) %
    24;

  currentData.timeHour = 11;
  currentData.condition = {
    ...currentData.condition,
    icon: `https:${current.condition.icon}`.replace("64x64", "128x128"),

    ...find(
      ConditionAttributesColorData,
      (data) => data.code == current.condition.code
    ),
  };

  console.log(currentData.condition);

  const hoursData = get(forecast, "forecastday.0.hour", []).map(
    (hourItem: any) => {
      const hourLevelData = pick(hourItem, [
        ...values(HourWeatherAttributesImperial),
        ...values(HourWeatherAttributesUniversal),
      ]);
      const hourMomentTime = moment
        .unix(hourLevelData.time_epoch)
        .tz(location.tz_id);
      hourLevelData.timeAgo = hourMomentTime.fromNow();
      hourLevelData.timeHour = hourMomentTime.hour();
      return hourLevelData;
    }
  );
  return {
    location,
    current: currentData,
    forecast: {
      day: get(forecast, "forecastday").map((dayItem: any) => {
        const dayLevelData = pick(dayItem.day, [
          ...values(DayWeatherAttributesImperial),
          ...values(DayWeatherAttributesUniversal),
        ]) as DayWeather;

        const dayMoment = moment.unix(dayItem.date_epoch).tz(location.tz_id);
        dayLevelData.dayOfWeek = dayMoment.format("dddd");
        return dayLevelData;
      }),
      hour: hoursData,
    },
  };
};
