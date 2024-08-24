import { Image, Text, View } from "react-native";

type TConditionCardProps = {
  condition: WeatherCondition;
  temp: string;
  feelsLike: string;
  isDay: boolean;
};

const ConditionCard = ({
  condition,
  temp,
  feelsLike,
  isDay,
}: TConditionCardProps) => {
  const bgColor = isDay ? condition.dayColors?.[0] : condition.nightColors?.[0];
  return (
    <View
      className="flex-row justify-between gap-4 py-4  rounded-xl drop-shadow"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <View className="flex-1 flex-col gap-2">
        <Image
          source={{ uri: condition.icon }}
          resizeMode="contain"
          className="h-40"
        />
        <Text className="text-center font-bold color-slate-600 text-xl px-4 pb-4">
          {condition.text}
        </Text>
      </View>

      <View className="flex-none gap-8 py-8 pr-8 align-end justify-center">
        <Text className="text-right font-bold color-slate-600 text-4xl">
          {temp}
        </Text>
        <Text className="text-right font-semibold color-slate-500 text-xl ">
          {"Feels Like  "}
          <Text className="text-right font-bold color-slate-600 text-2xl">
            {feelsLike}
          </Text>
        </Text>
        <Text className="text-right font-bold color-slate-600 text-xl pe-8">
          {isDay ? "Day" : "Night"}
        </Text>
      </View>
    </View>
  );
};

export default ConditionCard;
