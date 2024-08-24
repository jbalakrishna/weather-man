import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type TWeatherContainerProps = {
  data: WeatherData;
};

export default function WeatherContainer(props: TWeatherContainerProps) {
  const {
    data: { current, forecast, location },
  } = props;

  const scrollRef = useRef<ScrollView>(null);
  const [scrollToX, setScrollToX] = useState<number>(-1);

  useEffect(() => {
    if (scrollToX > -1) {
      scrollRef.current?.scrollTo({
        x: scrollToX,
        y: 0,
        animated: true,
      });
    }
  }, [scrollToX]);

  return (
    <ScrollView>
      <View className="flex-1 gap-7 px-8 py-8 bg-blue-100">
        <View className="flex-1 flex-row justify-between">
          <TouchableOpacity>
            <View className="flex-row border-2 rounded-full gap-3 border-slate-400 py-2 px-4 border-radius-8">
              <Text>{`${location.name}, ${location.region}`}</Text>
              <Ionicons name="chevron-down" size={16} />
            </View>
          </TouchableOpacity>
          <Text className="border-2 rounded-full border-slate-400 py-2 px-8 border-radius-8">
            {current.timeAgo}
          </Text>
        </View>
        <View className="flex-1 gap-4 p-4 border-2 border-slate-400 rounded-xl">
          <Text>{current.condition.text}</Text>
          <Text>Current Temperature {current.temp_c}</Text>
          <Text>Feels Like {current.feelslike_c}</Text>
        </View>
        <Text>Details</Text>
        <View className="flex-1 gap-4 p-4 border-2 border-slate-400 rounded-xl">
          <View className="flex-1 flex-row justify-between">
            <Text>Humidity {current.humidity}%</Text>
            <Text>Dew {current.dewpoint_c}</Text>
          </View>
          <View className="flex-1 flex-row justify-between">
            <Text>Wind {current.wind_kph} kmph</Text>
            <Text>Wind chill {current.windchill_c}</Text>
          </View>
          <View className="flex-1 flex-row justify-between">
            <Text>Clouds {current.cloud}%</Text>
          </View>
        </View>
        <Text>Forecast for the Day</Text>
        <ScrollView horizontal ref={scrollRef}>
          <View className="flex-1 gap-4 flex-row">
            {forecast.hour.map((hour, index) => (
              <View
                className="flex-1 gap-4 p-4 border-2 border-slate-400 rounded-xl"
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;

                  if (hour.timeHour == current.timeHour) {
                    setScrollToX(layout.x);
                  }
                }}
                key={index}
              >
                <Text>{hour.time} </Text>
                <Text>{hour.temp_c} </Text>
                <Text>{hour.wind_kph} </Text>
                <Text>{hour.condition.text} </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Fragment></Fragment>
        <Text>This week</Text>
        <ScrollView>
          <View className="flex-1 gap-4">
            {forecast.day.map((day, index) => (
              <View
                className="flex-1 gap-4 p-4 border-2 border-slate-400 rounded-xl"
                key={index}
              >
                <Text>{day.mintemp_c} </Text>
                <Text>{day.maxtemp_c} </Text>
                <Text>{day.dayOfWeek} </Text>
                <Text>{day.condition?.text} </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
