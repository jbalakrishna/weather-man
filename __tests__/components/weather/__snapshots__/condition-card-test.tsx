import ConditionCard from "@/components/weather/condition-card";
import { render, waitFor } from "@testing-library/react-native";

describe("Condition Card Day", () => {
  test("day mode should render correctly", async () => {
    const tree = render(
      <ConditionCard
        condition={{
          text: "Sunny",
          icon: "icon1",
          code: 120,
          dayColors: ["#fff", "#fff"],
          nightColors: ["#000", "#000"],
        }}
        temp={"23.4"}
        feelsLike={"22.4"}
        isDay
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
        condition={{
          text: "Sunny",
          icon: "icon1",
          code: 120,
          dayColors: ["#fff", "#fff"],
          nightColors: ["#000", "#000"],
        }}
        temp={"23.4"}
        feelsLike={"22.4"}
        isDay={false}
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
        condition={{
          text: "Sunny",
          icon: "icon1",
          code: 120,
          dayColors: [],
          nightColors: [],
        }}
        temp={"23.4"}
        feelsLike={"22.4"}
        isDay={false}
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
        condition={{
          text: "Sunny",
          icon: "",
          code: 120,
          dayColors: [],
          nightColors: [],
        }}
        temp={"23.4"}
        feelsLike={"22.4"}
        isDay={false}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
  });
});
