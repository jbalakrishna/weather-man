import ErrorSnackbar from "@/components/common/error-snackbar";
import useIsOffline from "@/components/common/hooks/useIsOffline";
import LocationSelectionModal from "@/components/location/location-selection-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { throttle } from "lodash";
import { Fragment, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ConditionCard from "../condition-card";
import DaysContent from "../days-content";
import HoursContent from "../hours-content";
import useWeatherStore from "../store";
import WeatherMoreDetails from "../weather-more-details";

type TWeatherContainerProps = {
  data: WeatherData;
};

export default function WeatherContainer(props: TWeatherContainerProps) {
  const {
    data: { current, forecast, location },
  } = props;
  const isOffline = useIsOffline();
  const [locationModalVisible, setLocationModalVisible] =
    useState<boolean>(false);
  const store = useWeatherStore();
  const handleLocationModal = () => {
    if (isOffline) return;
    store.clearError();
    setLocationModalVisible(true);
  };

  const handleRefresh = async () => {
    if (isOffline) return;
    store.clearError();
    await store.fetchWeather();
  };

  const locationText = `${location.name}, ${location.region}`;

  return (
    <Fragment>
      <ScrollView>
        <ErrorSnackbar error={store.error} />
        <View
          className="flex-1 gap-7 px-4 pt-4 pb-20 bg-white dark:bg-slate-900"
          style={{ backgroundColor: "#fff" }}
        >
          <View className="flex-1 flex-row justify-between">
            <TouchableOpacity onPress={handleLocationModal}>
              <View className="flex-row border-2 rounded-full gap-3 border-slate-400 py-3 px-6 border-radius-8">
                <Text className="font-semibold text-l text-slate-700 text-primary">
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
          <ConditionCard current={current} />

          <WeatherMoreDetails current={current} />
          <HoursContent forecast={forecast} current={current} />
          <DaysContent forecast={forecast} />
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
