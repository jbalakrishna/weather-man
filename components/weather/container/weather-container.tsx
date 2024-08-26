import { Error } from "@/components/common/types";
import { Fragment } from "react";
import { ScrollView, View } from "react-native";
import ConditionCard from "../condition-card";
import DaysContent from "../days-content";
import HoursContent from "../hours-content";
import WeatherMoreDetails from "../weather-more-details";

type TWeatherContainerProps = {
  data: WeatherData;
  error: Error | null;
};

export default function WeatherContainer(props: TWeatherContainerProps) {
  const {
    data: { current, forecast },
  } = props;

  return (
    <Fragment>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View
          className="flex-1 gap-7 px-4 pt-4 pb-20 bg-white dark:bg-slate-900"
          style={{ backgroundColor: "#fff" }}
        >
          <ConditionCard current={current} />

          <WeatherMoreDetails current={current} />
          <HoursContent forecast={forecast} current={current} />
          <DaysContent forecast={forecast} />
        </View>
      </ScrollView>
    </Fragment>
  );
}
