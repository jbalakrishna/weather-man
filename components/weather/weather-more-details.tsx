import { Fragment } from "react";
import { Text, View } from "react-native";
type TWeatherMoreDetailsProps = {
  humidity: number;
  dewpoint: string;
  wind: string;
  windchill: string;
  cloud: number;
};

const TextAndSubText = (props: { text: string; subText: string }) => {
  return (
    <Text className={"font-semibold text-slate-400 text-xl"}>
      {props.subText}
      <Text className="text-2xl font-bold text-slate-600">{props.text}</Text>
    </Text>
  );
};

const WeatherMoreDetails = (props: TWeatherMoreDetailsProps) => {
  return (
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">Details</Text>
      <View className="flex-1 gap-8 px-5 py-8 bg-slate-100 rounded-xl">
        <View className="flex-1 flex-row gap-4 justify-between">
          <TextAndSubText text={`${props.humidity}%`} subText={"Humidity  "} />
          <TextAndSubText text={`${props.dewpoint}`} subText={"Dew  "} />
        </View>
        <View className="flex-1 flex-row justify-between">
          <TextAndSubText text={props.wind} subText={"Wind  "} />
          <TextAndSubText text={props.windchill} subText={"Wind chill  "} />
        </View>
        <View className="flex-1 flex-row justify-end">
          <TextAndSubText text={`${props.cloud}%`} subText={"Clouds  "} />
        </View>
      </View>
    </Fragment>
  );
};

export default WeatherMoreDetails;
