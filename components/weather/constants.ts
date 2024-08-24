const CurrentWeatherAttributesImperial: CurrentWeatherAttributes = {
  dewpoint: "dewpoint_f",
  feelslike: "feelslike_f",
  cloud: "cloud",
  condition: "condition",
  humidity: "humidity",
  temp: "temp_f",
  is_day: "is_day",
  wind: "wind_mph",
  windchill: "windchill_f",
  time: "last_updated",
  time_epoch: "last_updated_epoch",
};

const CurrentWeatherAttributesUniversal: CurrentWeatherAttributes = {
  dewpoint: "dewpoint_c",
  feelslike: "feelslike_c",
  cloud: "cloud",
  condition: "condition",
  humidity: "humidity",
  temp: "temp_c",
  is_day: "is_day",
  wind: "wind_kph",
  windchill: "windchill_c",
  time: "last_updated",
  time_epoch: "last_updated_epoch",
};

const DayWeatherAttributesImperial: DayWeatherAttributes = {
  chance_of_rain: "chance_of_rain",
  chance_of_snow: "chance_of_snow",
  mintemp: "mintemp_f",
  maxtemp: "maxtemp_f",
  condition: "condition",
};

const DayWeatherAttributesUniversal: DayWeatherAttributes = {
  chance_of_rain: "chance_of_rain",
  chance_of_snow: "chance_of_snow",
  mintemp: "mintemp_c",
  maxtemp: "maxtemp_c",
  condition: "condition",
};

const HourWeatherAttributesImperial: HourWeatherAttributes = {
  time: "time",
  time_epoch: "time_epoch",
  dewpoint: "dewpoint_f",
  feelslike: "feelslike_f",
  cloud: "cloud",
  condition: "condition",
  humidity: "humidity",
  temp: "temp_f",
  is_day: "is_day",
  wind: "wind_mph",
  windchill: "windchill_f",
  chance_of_rain: "chance_of_rain",
  chance_of_snow: "chance_of_snow",
};

const HourWeatherAttributesUniversal: HourWeatherAttributes = {
  time: "time",
  time_epoch: "time_epoch",
  dewpoint: "dewpoint_c",
  feelslike: "feelslike_c",
  cloud: "cloud",
  condition: "condition",
  humidity: "humidity",
  temp: "temp_c",
  is_day: "is_day",
  wind: "wind_kph",
  windchill: "windchill_c",
  chance_of_rain: "chance_of_rain",
  chance_of_snow: "chance_of_snow",
};

export {
  CurrentWeatherAttributesImperial,
  CurrentWeatherAttributesUniversal,
  DayWeatherAttributesImperial,
  DayWeatherAttributesUniversal,
  HourWeatherAttributesImperial,
  HourWeatherAttributesUniversal,
};
