import WeatherMoreDetails from "@/components/weather/weather-more-details";
import { render, waitFor } from "@testing-library/react-native";

describe("weather details ", () => {
  test("weather details with static details renders correctly", async () => {
    const tree = render(
      <WeatherMoreDetails
        humidity={22}
        dewpoint={"6"}
        wind={"20"}
        windchill={"10"}
        cloud={5}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
