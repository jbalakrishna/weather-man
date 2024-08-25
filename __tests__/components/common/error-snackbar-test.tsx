import ErrorSnackbar from "@/components/common/error-snackbar";
import { ErrorType } from "@/components/common/errors";
import { act, render, waitFor } from "@testing-library/react-native";

jest.mock("@/components/common/hooks/useIsOffline", () => () => true);

describe("ErrorSnackbar 1", () => {
  test("error mode should render correctly", async () => {
    const promise = Promise.resolve();
    const tree = render(
      <ErrorSnackbar
        error={{
          errorType: ErrorType.GENERIC,
          message: "any msg",
        }}
      />
    ).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
    await act(async () => {
      await promise;
    });
  });
});

describe("ErrorSnackbar 2", () => {
  test("offline mode should correctly", async () => {
    const promise = Promise.resolve();
    const tree = render(<ErrorSnackbar error={null} />).toJSON();

    await waitFor(() => {
      expect(tree).toMatchSnapshot();
    });
    await act(async () => {
      await promise;
    });
  });
});
