import LocationSelectionModal from "@/components/location/location-selection-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { throttle } from "lodash";
import { Fragment, useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ConditionCard from "../condition-card";
import useWeatherStore from "../store";
import WeatherMoreDetails from "../weather-more-details";

type TWeatherContainerProps = {
  data: WeatherData;
};

export default function WeatherContainer(props: TWeatherContainerProps) {
  const {
    data: { current, forecast, location },
  } = props;

  const scrollRef = useRef<ScrollView>(null);
  const [scrollToX, setScrollToX] = useState<number>(-1);
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const store = useWeatherStore();
  const handleLocationModal = () => {
    setLocationModalVisible(true);
  };

  const handleRefresh = async () => {
    await store.fetchWeather();
  };

  useEffect(() => {
    if (scrollToX > -1) {
      scrollRef.current?.scrollTo({
        x: scrollToX,
        y: 0,
        animated: true,
      });
    }
  }, [scrollToX]);

  const locationText = `${location.name}, ${location.region}`;

  return (
    <Fragment>
      <ScrollView>
        <View className="flex-1 gap-7 px-8 py-8 bg-white">
          <View className="flex-1 flex-row justify-between">
            <TouchableOpacity onPress={handleLocationModal}>
              <View className="flex-row border-2 rounded-full gap-3 border-slate-400 py-3 px-6 border-radius-8">
                <Text className="font-semibold text-l text-slate-700">
                  {locationText}
                </Text>
                <Ionicons name="chevron-down" size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRefresh}>
              <View className="py-2 mt-2 flex-row gap-2">
                <Text className="text-right text-base font-medium text-slate-500">
                  {current.timeAgo}
                </Text>
                <Ionicons name="refresh-sharp" size={18} />
              </View>
            </TouchableOpacity>
          </View>
          <ConditionCard
            condition={current.condition}
            temp={`${current.temp_c}°C`}
            feelsLike={`${current.feelslike_c}°C`}
            isDay={current.is_day == 1}
          />

          <WeatherMoreDetails
            humidity={current.humidity}
            dewpoint={`${current.dewpoint_c}°C`}
            wind={`${current.wind_kph} kmph`}
            windchill={`${current.windchill_c}°C`}
            cloud={current.cloud}
          />

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

      <LocationSelectionModal
        locationText={locationText}
        modalVisible={locationModalVisible}
        onClose={() => {
          throttle(() => setLocationModalVisible(false), 1000, {
            trailing: true,
          })();
        }}
      />
    </Fragment>
  );
}
