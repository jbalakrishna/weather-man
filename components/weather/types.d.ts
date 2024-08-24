type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
  dayColors?: string[];
  nightColors?: string[];
};

type CurrentWeather = {
  last_updated: string;
  last_updated_epoch: number;
  timeAgo: string;
  timeHour: number;
  cloud: number;
  condition: WeatherCondition;
  humidity: number;
  is_day: number;
  dewpoint_f: number;
  feelslike_f: number;
  temp_f: number;
  wind_mph: number;
  windchill_f: number;
  dewpoint_c: number;
  feelslike_c: number;
  temp_c: number;
  wind_kph: number;
  windchill_c: number;
};

type DayWeather = {
  condition: WeatherCondition;
  chance_of_rain: number;
  chance_of_snow: number;
  mintemp_f: number;
  mintemp_c: number;
  maxtemp_f: number;
  maxtemp_c: number;
  dayOfWeek: string;
};

type HourWeather = {
  time: string;
  time_epoch: number;
  timeAgo: string;
  timeHour: number;
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: WeatherCondition;
  humidity: number;
  is_day: number;
  dewpoint_f: number;
  feelslike_f: number;
  temp_f: number;
  wind_mph: number;
  windchill_f: number;
  dewpoint_c: number;
  feelslike_c: number;
  temp_c: number;
  wind_kph: number;
  windchill_c: number;
};

type CurrentWeatherAttributes = {
  time: string;
  time_epoch: string;
  dewpoint: string;
  feelslike: string;
  cloud: string;
  condition: string;
  humidity: string;
  temp: string;
  is_day: string;
  wind: string;
  windchill: string;
};

type DayWeatherAttributes = {
  chance_of_rain: string;
  chance_of_snow: string;
  mintemp: string;
  maxtemp: string;
  condition: string;
};

type HourWeatherAttributes = {
  time: string;
  time_epoch: string;
  chance_of_rain: string;
  chance_of_snow: string;
  dewpoint: string;
  feelslike: string;
  cloud: string;
  condition: string;
  humidity: string;
  temp: string;
  is_day: string;
  wind: string;
  windchill: string;
};

type CurrentLocation = {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};

type WeatherData = {
  current: CurrentWeather;
  location: CurrentLocation;
  forecast: {
    day: DayWeather[];
    hour: HourWeather[];
  };
};

type ConditionAttributes = {
  code: number;
  text: string;
  icon: string;
  dayColors: string[];
  nightColors: string[];
};
