import { Ionicons } from "@expo/vector-icons";
import { Fragment, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useSettingsStore from "../common/settings/store";
type TWeatherMoreDetailsProps = {
  current: WeatherData["current"];
};

const TextAndSubText = (props: { text: string; subText: string }) => {
  return (
    <Text className={"font-semibold text-slate-400 text-xl"}>
      {props.subText}
      <Text className="text-2xl font-bold text-slate-600">{props.text}</Text>
    </Text>
  );
};
const maxHeight = 220;

const WeatherMoreDetails = ({ current }: TWeatherMoreDetailsProps) => {
  const settingsStore = useSettingsStore();

  const isMetric = settingsStore.getUnits() === "metric";
  const tempSuffix = settingsStore.getTemperatureSuffix();
  const speedSuffix = settingsStore.getSpeedSuffix();
  const dewpoint = `${
    isMetric ? current.dewpoint_c : current.dewpoint_f
  } ${tempSuffix}`;
  const wind = `${
    isMetric ? current.wind_kph : current.wind_mph
  } ${speedSuffix}`;
  const windchill = `${
    isMetric ? current.windchill_c : current.windchill_f
  } ${tempSuffix}`;

  const [showAqi, setShowAqi] = useState(false);
  const animatedVal = useRef(new Animated.Value(0)).current;

  const handleShowAqi = () => {
    const toAnimatedVal = showAqi ? 0 : 1;
    setShowAqi(!showAqi);
    Animated.timing(animatedVal, {
      toValue: toAnimatedVal,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });

  return (
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">Details</Text>
      <View className="flex-1 gap-8 px-5 pt-8 bg-slate-100 rounded-xl">
        <View className="flex-1 flex-row gap-4 justify-between">
          <TextAndSubText
            text={`${current.humidity}%`}
            subText={"Humidity  "}
          />
          <TextAndSubText text={`${dewpoint}`} subText={"Dew  "} />
        </View>
        <View className="flex-1 flex-row justify-between">
          <TextAndSubText text={wind} subText={"Wind  "} />
          <TextAndSubText text={windchill} subText={"Wind chill  "} />
        </View>
        <View className="flex-1 flex-row justify-between">
          <View className="py-2">
            <TextAndSubText text={`${current.cloud}%`} subText={"Clouds  "} />
          </View>
          <TouchableOpacity onPress={handleShowAqi}>
            <View className="flex-row gap-2 py-2">
              <Text className="text-2xl font-bold text-slate-600">AQI</Text>
              <Ionicons
                className="pt-1"
                name={showAqi ? "chevron-up" : "chevron-down"}
                size={16}
                color="slate"
              />
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View style={{ height: animatedHeight }}>
          <View className="flex-1 gap-2">
            <Text className={"font-semibold text-slate-400 text-xl"}>
              {"General Index  "}
              <Text
                className="text-2xl font-bold"
                style={{ color: current.air_quality.indexInfo.color }}
              >
                {current.air_quality.indexInfo.label}
              </Text>
            </Text>
            <TextAndSubText
              text={`${current.air_quality.co}`}
              subText={"Carbon Monoxide (μg/m3)  "}
            />

            <TextAndSubText
              text={`${current.air_quality.o3}`}
              subText={"Ozone (μg/m3)  "}
            />
            <TextAndSubText
              text={`${current.air_quality.no2}`}
              subText={"Nitrogen dioxide (μg/m3)  "}
            />
            <TextAndSubText
              text={`${current.air_quality.so2}`}
              subText={"Sulphur dioxide (μg/m3)  "}
            />
            <TextAndSubText
              text={`${current.air_quality.pm2_5}`}
              subText={"PM2.5 (μg/m3)  "}
            />
            <TextAndSubText
              text={`${current.air_quality.pm10}`}
              subText={"PM10 (μg/m3)  "}
            />
          </View>
        </Animated.View>
      </View>
    </Fragment>
  );
};

export default WeatherMoreDetails;
