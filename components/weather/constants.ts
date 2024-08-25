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
  air_quality: "air_quality",
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
  air_quality: "air_quality",
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

const ConditionAttributesColorData = [
  {
    code: 1000,
    dayColors: ["#FFD580", "#FFE5B4"],
    nightColors: ["#FFCCCB", "#FFE4E1"],
  },
  {
    code: 1003,
    dayColors: ["#FFDEAD", "#B0E0E6"],
    nightColors: ["#CFCFC4", "#D3D3D3"],
  },
  {
    code: 1006,
    dayColors: ["#C0C0C0", "#A9A9A9"],
    nightColors: ["#B0C4DE", "#D3D3D3"],
  },
  {
    code: 1009,
    dayColors: ["#BEBEBE", "#808080"],
    nightColors: ["#696969", "#778899"],
  },
  {
    code: 1030,
    dayColors: ["#E0E0E0", "#B0C4DE"],
    nightColors: ["#DCDCDC", "#C0C0C0"],
  },
  {
    code: 1063,
    dayColors: ["#ADD8E6", "#87CEFA"],
    nightColors: ["#B0E0E6", "#AFEEEE"],
  },
  {
    code: 1066,
    dayColors: ["#E0FFFF", "#AFEEEE"],
    nightColors: ["#D3D3D3", "#B0C4DE"],
  },
  {
    code: 1069,
    dayColors: ["#B0C4DE", "#C0C0C0"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1072,
    dayColors: ["#D3D3D3", "#E0E0E0"],
    nightColors: ["#B0C4DE", "#AFEEEE"],
  },
  {
    code: 1087,
    dayColors: ["#ADD8E6", "#B0C4DE"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1114,
    dayColors: ["#E0FFFF", "#F0F8FF"],
    nightColors: ["#D3D3D3", "#B0C4DE"],
  },
  {
    code: 1117,
    dayColors: ["#F0FFFF", "#E6E6FA"],
    nightColors: ["#D3D3D3", "#778899"],
  },
  {
    code: 1135,
    dayColors: ["#DCDCDC", "#F5F5F5"],
    nightColors: ["#C0C0C0", "#B0C4DE"],
  },
  {
    code: 1147,
    dayColors: ["#D3D3D3", "#E0FFFF"],
    nightColors: ["#B0C4DE", "#AFEEEE"],
  },
  {
    code: 1150,
    dayColors: ["#B0E0E6", "#ADD8E6"],
    nightColors: ["#AFEEEE", "#87CEEB"],
  },
  {
    code: 1153,
    dayColors: ["#B0C4DE", "#A9A9A9"],
    nightColors: ["#AFEEEE", "#B0E0E6"],
  },
  {
    code: 1168,
    dayColors: ["#D3D3D3", "#B0C4DE"],
    nightColors: ["#AFEEEE", "#E0FFFF"],
  },
  {
    code: 1171,
    dayColors: ["#C0C0C0", "#A9A9A9"],
    nightColors: ["#778899", "#B0C4DE"],
  },
  {
    code: 1180,
    dayColors: ["#ADD8E6", "#87CEFA"],
    nightColors: ["#B0E0E6", "#AFEEEE"],
  },
  {
    code: 1183,
    dayColors: ["#87CEEB", "#87CEFA"],
    nightColors: ["#B0E0E6", "#ADD8E6"],
  },
  {
    code: 1186,
    dayColors: ["#87CEFA", "#4682B4"],
    nightColors: ["#5F9EA0", "#B0E0E6"],
  },
  {
    code: 1189,
    dayColors: ["#4682B4", "#5F9EA0"],
    nightColors: ["#87CEEB", "#87CEFA"],
  },
  {
    code: 1192,
    dayColors: ["#5F9EA0", "#4682B4"],
    nightColors: ["#87CEFA", "#87CEEB"],
  },
  {
    code: 1195,
    dayColors: ["#4682B4", "#4169E1"],
    nightColors: ["#87CEFA", "#5F9EA0"],
  },
  {
    code: 1198,
    dayColors: ["#B0C4DE", "#AFEEEE"],
    nightColors: ["#87CEEB", "#E0FFFF"],
  },
  {
    code: 1201,
    dayColors: ["#5F9EA0", "#4682B4"],
    nightColors: ["#778899", "#B0C4DE"],
  },
  {
    code: 1204,
    dayColors: ["#B0C4DE", "#D3D3D3"],
    nightColors: ["#778899", "#AFEEEE"],
  },
  {
    code: 1207,
    dayColors: ["#C0C0C0", "#A9A9A9"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1210,
    dayColors: ["#F0F8FF", "#E0FFFF"],
    nightColors: ["#AFEEEE", "#B0C4DE"],
  },
  {
    code: 1213,
    dayColors: ["#E6E6FA", "#F0FFFF"],
    nightColors: ["#D3D3D3", "#F0F8FF"],
  },
  {
    code: 1216,
    dayColors: ["#F5F5F5", "#E0FFFF"],
    nightColors: ["#D3D3D3", "#AFEEEE"],
  },
  {
    code: 1219,
    dayColors: ["#E0FFFF", "#B0C4DE"],
    nightColors: ["#D3D3D3", "#778899"],
  },
  {
    code: 1222,
    dayColors: ["#D3D3D3", "#B0C4DE"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1225,
    dayColors: ["#A9A9A9", "#C0C0C0"],
    nightColors: ["#778899", "#B0C4DE"],
  },
  {
    code: 1237,
    dayColors: ["#C0C0C0", "#A9A9A9"],
    nightColors: ["#778899", "#B0C4DE"],
  },
  {
    code: 1240,
    dayColors: ["#87CEEB", "#ADD8E6"],
    nightColors: ["#AFEEEE", "#87CEFA"],
  },
  {
    code: 1243,
    dayColors: ["#4682B4", "#5F9EA0"],
    nightColors: ["#87CEFA", "#87CEEB"],
  },
  {
    code: 1246,
    dayColors: ["#4169E1", "#4682B4"],
    nightColors: ["#5F9EA0", "#87CEFA"],
  },
  {
    code: 1249,
    dayColors: ["#B0C4DE", "#C0C0C0"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1252,
    dayColors: ["#A9A9A9", "#C0C0C0"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1255,
    dayColors: ["#E6E6FA", "#F0F8FF"],
    nightColors: ["#D3D3D3", "#AFEEEE"],
  },
  {
    code: 1258,
    dayColors: ["#B0C4DE", "#778899"],
    nightColors: ["#708090", "#A9A9A9"],
  },
  {
    code: 1261,
    dayColors: ["#C0C0C0", "#A9A9A9"],
    nightColors: ["#778899", "#B0C4DE"],
  },
  {
    code: 1264,
    dayColors: ["#A9A9A9", "#C0C0C0"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1273,
    dayColors: ["#ADD8E6", "#87CEEB"],
    nightColors: ["#B0E0E6", "#778899"],
  },
  {
    code: 1276,
    dayColors: ["#5F9EA0", "#4682B4"],
    nightColors: ["#778899", "#708090"],
  },
  {
    code: 1279,
    dayColors: ["#F0F8FF", "#E6E6FA"],
    nightColors: ["#D3D3D3", "#AFEEEE"],
  },
  {
    code: 1282,
    dayColors: ["#B0C4DE", "#778899"],
    nightColors: ["#708090", "#A9A9A9"],
  },
];

export {
  ConditionAttributesColorData,
  CurrentWeatherAttributesImperial,
  CurrentWeatherAttributesUniversal,
  DayWeatherAttributesImperial,
  DayWeatherAttributesUniversal,
  HourWeatherAttributesImperial,
  HourWeatherAttributesUniversal,
};
