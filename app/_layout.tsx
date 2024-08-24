import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerRight: () => <Ionicons name="menu" size={24} color="black" />,
        headerStyle: {
          backgroundColor: "#bfdbfe",
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
