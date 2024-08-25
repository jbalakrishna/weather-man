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
  return {
    location,
    current: mapCurrentData(current, location),
    forecast: {
      day: mapDaysData(forecast, location),
      hour: mapHoursData(forecast, location),
    },
  };
};

const getAqiInfo = (aqi: number): AqiInfo => {
  switch (aqi) {
    case 1:
      return { label: "Good", color: "#00E400" };
    case 2:
      return { label: "Moderate", color: "#FFFF00" };
    case 3:
      return { label: "Unhealthy for Sensitive Groups", color: "#FF7E00" };
    case 4:
      return { label: "Unhealthy", color: "#FF0000" };
    case 5:
      return { label: "Very Unhealthy", color: "#8F3F97" };
    case 6:
      return { label: "Hazardous", color: "#7E0023" };
    default:
      return { label: "", color: "" };
  }
};

export const mapCurrentData = (current: any, location: any): CurrentWeather => {
  const currentData = pick(current, [
    ...values(CurrentWeatherAttributesImperial),
    ...values(CurrentWeatherAttributesUniversal),
  ]) as CurrentWeather;
  const momentTime = moment.unix(current.last_updated_epoch).tz(location.tz_id);
  currentData.timeAgo = `${momentTime.fromNow(true)} ago`;
  currentData.timeHour =
    (momentTime.minutes() >= 40 ? momentTime.hour() + 1 : momentTime.hour()) %
    24;

  currentData.condition = {
    ...currentData.condition,
    icon: `https:${current.condition.icon}`.replace("64x64", "128x128"),

    ...find(
      ConditionAttributesColorData,
      (data) => data.code == current.condition.code
    ),
  };
  currentData.air_quality = {
    ...currentData.air_quality,
    indexInfo: getAqiInfo(current.air_quality["us-epa-index"]),
  };
  return currentData;
};

export const mapHoursData = (forecast: any, location: any): HourWeather[] => {
  return get(forecast, "forecastday.0.hour", []).map((hourItem: any) => {
    const hourLevelData = pick(hourItem, [
      ...values(HourWeatherAttributesImperial),
      ...values(HourWeatherAttributesUniversal),
    ]);
    const hourMomentTime = moment
      .unix(hourLevelData.time_epoch)
      .tz(location.tz_id);
    hourLevelData.timeAgo = hourMomentTime.fromNow();
    hourLevelData.timeHour = hourMomentTime.hour();
    hourLevelData.prettyTimeHour = hourMomentTime.format("hh A");
    return hourLevelData;
  });
};

export const mapDaysData = (forecast: any, location: any): DayWeather[] => {
  return get(forecast, "forecastday").map((dayItem: any) => {
    const dayLevelData = pick(dayItem.day, [
      ...values(DayWeatherAttributesImperial),
      ...values(DayWeatherAttributesUniversal),
    ]) as DayWeather;

    const dayMoment = moment.unix(dayItem.date_epoch).tz(location.tz_id);
    dayLevelData.condition = {
      ...dayLevelData.condition,
      icon: `https:${dayLevelData.condition.icon}`.replace("64x64", "128x128"),
      ...find(
        ConditionAttributesColorData,
        (data) => data.code == dayLevelData.condition.code
      ),
    };
    dayLevelData.dayOfWeek = dayMoment.format("dddd");
    dayLevelData.date = dayMoment.format("DD MMM YYYY");
    return dayLevelData;
  });
};
