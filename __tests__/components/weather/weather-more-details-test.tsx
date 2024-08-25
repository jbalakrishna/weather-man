import WeatherMoreDetails from "@/components/weather/weather-more-details";
import { render, waitFor } from "@testing-library/react-native";

describe("weather details ", () => {
  test("weather details with static details renders correctly", async () => {
    const tree = render(
      <WeatherMoreDetails
        current={{
          humidity: 50,
          dewpoint_c: 10.0,
          dewpoint_f: 50.0,
          wind_kph: 10.0,
          wind_mph: 5.0,
          windchill_c: 10.0,
          windchill_f: 50.0,
          last_updated: "10:20",
          last_updated_epoch: 20,
          timeAgo: "20 minutes ago",
          timeHour: 10,
          cloud: 20,
          condition: {
            text: "test",
            icon: "",
            code: 0,
          },
          is_day: 20,

          feelslike_f: 20,
          temp_f: 20,
          feelslike_c: 20,
          temp_c: 20,
          air_quality: {
            co: 191.9,
            no2: 0.6,
            o3: 32.2,
            so2: 0.8,
            pm2_5: 2.7,
            pm10: 5.5,
            "us-epa-index": 1,
            "gb-defra-index": 1,
            indexInfo: {
              label: "Good",
              color: "#00E400",
            },
          },
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
