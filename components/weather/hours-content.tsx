import React, { Fragment, useEffect, useMemo, useRef } from "react";
import { Dimensions, ScrollView, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

type THoursContentProps = {
  forecast: WeatherData["forecast"];
  current: WeatherData["current"];
};

const chartConfig = {
  backgroundGradientFrom: "rgb(254 215 170);",
  backgroundGradientFromOpacity: 0.7,
  backgroundGradientToOpacity: 1,
  backgroundGradientTo: "rgb(254 215 170);",
  color: () => `rgb(133 77 14);`,
  strokeWidth: 1,
  barPercentage: 0.5,
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
  style: {
    borderRadius: 16,
  },
  paddingLeft: 0,
};

const HoursContent = ({ forecast, current }: THoursContentProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollToX = useRef<number>(-1);

  useEffect(() => {
    const approxBarWidth = screenWidth / 40;
    scrollToX.current = current.timeHour * 1.12 * approxBarWidth + 40;
    scrollRef.current?.scrollTo({
      x: scrollToX.current,
      y: 0,
      animated: true,
    });
  }, [current]);

  const screenWidth = Dimensions.get("window").width * 3;

  const barData = useMemo(() => {
    return {
      labels: forecast.hour.map((hour) => hour.prettyTimeHour),
      datasets: [
        {
          data: forecast.hour.map((hour) => hour.temp_c),
        },
      ],
    };
  }, [forecast.hour]);

  if (!forecast) return null;

  return (
    <Fragment>
      <Text className="font-bold text-2xl text-slate-700">
        Todays's Forecast
      </Text>
      <ScrollView className="rounded-l" horizontal ref={scrollRef}>
        <LineChart
          data={barData}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 16 }}
          withHorizontalLabels={false}
          yAxisLabel=""
          yAxisSuffix=""
          xLabelsOffset={4}
          withInnerLines={false}
        />
      </ScrollView>
    </Fragment>
  );
};

export default HoursContent;
