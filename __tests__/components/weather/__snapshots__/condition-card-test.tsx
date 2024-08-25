import ConditionCard from "@/components/weather/condition-card";
import { render, waitFor } from "@testing-library/react-native";

describe("Condition Card Day", () => {
  test("day mode should render correctly", async () => {
    const tree = render(
      <ConditionCard
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
            text: "Sunny",
            icon: "icon1",
            code: 120,
            dayColors: ["#fff", "#fff"],
            nightColors: ["#000", "#000"],
          },
          is_day: 1,
          feelslike_f: 20,
          temp_f: 20,
          feelslike_c: 20,
          temp_c: 20,
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("Condition Card Night", () => {
  test("night mode should render correctly", async () => {
    const tree = render(
      <ConditionCard
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
            text: "Sunny",
            icon: "icon1",
            code: 120,
            dayColors: ["#fff", "#fff"],
            nightColors: ["#000", "#000"],
          },
          is_day: 0,
          feelslike_f: 20,
          temp_f: 20,
          feelslike_c: 20,
          temp_c: 20,
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("Condition Card without colors", () => {
  test("without colors should render correctly", async () => {
    const tree = render(
      <ConditionCard
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
            text: "Sunny",
            icon: "icon1",
            code: 120,
            dayColors: [],
            nightColors: [],
          },
          is_day: 1,
          feelslike_f: 20,
          temp_f: 20,
          feelslike_c: 20,
          temp_c: 20,
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});

describe("Condition Card without icon", () => {
  test("without icon should render correctly", async () => {
    const tree = render(
      <ConditionCard
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
            text: "Sunny",
            icon: "",
            code: 120,
            dayColors: [],
            nightColors: [],
          },
          is_day: 1,
          feelslike_f: 20,
          temp_f: 20,
          feelslike_c: 20,
          temp_c: 20,
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
