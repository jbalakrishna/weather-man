import { Fragment, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

type THoursContentProps = {
  forecast: WeatherData["forecast"];
  current: WeatherData["current"];
};

const HoursContent = ({ forecast, current }: THoursContentProps) => {
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
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">
        Forecast for the Day
      </Text>
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
    </Fragment>
  );
};

export default HoursContent;
