import { Fragment } from "react";
import { Image, Text, View } from "react-native";
import useSettingsStore from "../common/settings/store";

type TDaysContentProps = {
  forecast: WeatherData["forecast"];
};

type TDayCardProps = {
  day: DayWeather;
  index: number;
};

const DayCard = ({ day, index }: TDayCardProps) => {
  const bgColor = day.condition.dayColors?.[0] || "#E2E8F0";
  const settingsStore = useSettingsStore();

  const isMetric = settingsStore.getUnits() === "metric";
  const tempSuffix = settingsStore.getTemperatureSuffix();
  const maxtemp = `${isMetric ? day.maxtemp_c : day.maxtemp_f} ${tempSuffix}`;
  const mintemp = `${isMetric ? day.mintemp_c : day.mintemp_f} ${tempSuffix}`;
  return (
    <View
      className="flex-1 flex-row gap-4 pr-6 py-8 rounded-xl"
      key={index}
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex-1 flex-col gap-2 ml-4 mr-8 justify-center ">
        <Image
          source={{ uri: day.condition.icon }}
          resizeMode="contain"
          className="h-20"
        />
        <Text className="text-center font-bold color-slate-500 text-xl">
          {day.condition.text}
        </Text>
      </View>

      <View className="flex-none flex-col gap-2 justify-between">
        <View className="flex-row">
          <Text className="text-right font-bold color-slate-600 text-2xl">
            {mintemp} - {maxtemp}
          </Text>
        </View>
        <Text className="text-right font-semibold color-slate-500 text-xl">
          {day.date}
        </Text>
        <Text className="text-right font-semibold color-slate-500 text-xl">
          {day.dayOfWeek}
        </Text>
      </View>
    </View>
  );
};

const DaysContent = ({ forecast }: TDaysContentProps) => {
  return (
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">This week</Text>
      <View className="flex-1 gap-4">
        {forecast.day.map((day, index) => (
          <DayCard key={index} index={index} day={day} />
        ))}
      </View>
    </Fragment>
  );
};

export default DaysContent;
