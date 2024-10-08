import { Image, Text, View } from "react-native";
import useSettingsStore from "../common/settings/store";

type TConditionCardProps = {
  current: WeatherData["current"];
};

const ConditionCard = ({ current }: TConditionCardProps) => {
  const bgColor =
    (current.is_day
      ? current.condition.dayColors?.[0]
      : current.condition.nightColors?.[0]) || "#E2E8F0";
  const settingsStore = useSettingsStore();

  const isMetric = settingsStore.getUnits() === "metric";
  const tempSuffix = settingsStore.getTemperatureSuffix();
  const temp = `${isMetric ? current.temp_c : current.temp_f} ${tempSuffix}`;
  const feelsLike = `${
    isMetric ? current.feelslike_c : current.feelslike_f
  } ${tempSuffix}`;

  return (
    <View
      className="flex-row justify-between gap-4 py-4  rounded-xl drop-shadow"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <View className="flex-1 flex-col gap-2">
        <Image
          source={{ uri: current.condition.icon }}
          resizeMode="contain"
          className="h-40"
        />
        <Text className="text-center font-bold color-slate-600 text-xl px-4 pb-4">
          {current.condition.text}
        </Text>
      </View>

      <View className="flex-none gap-8 py-8 pr-8 align-end justify-start">
        <Text className="text-right font-bold color-slate-600 text-4xl">
          {temp}
        </Text>
        <View>
          <Text className="text-right font-semibold color-slate-500 text-xl ">
            {"Feels Like"}
          </Text>
          <Text className="text-right font-bold color-slate-600 text-2xl">
            {feelsLike}
          </Text>
        </View>
      </View>
      <Text className="absolute bottom-0 right-0 text-right font-bold color-slate-600 text-xl mb-8 mr-8">
        {current.is_day ? "Day" : "Night"}
      </Text>
    </View>
  );
};

export default ConditionCard;
