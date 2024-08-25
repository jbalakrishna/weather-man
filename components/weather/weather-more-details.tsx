import { Fragment } from "react";
import { Text, View } from "react-native";
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
  return (
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">Details</Text>
      <View className="flex-1 gap-8 px-5 py-8 bg-slate-100 rounded-xl">
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
        <View className="flex-1 flex-row justify-end">
          <TextAndSubText text={`${current.cloud}%`} subText={"Clouds  "} />
        </View>
      </View>
    </Fragment>
  );
};

export default WeatherMoreDetails;
