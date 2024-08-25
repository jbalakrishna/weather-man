import DrawerScreen from "@/components/common/drawer-screen";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#fff",
          },

          drawerType: "slide",
        }}
        drawerContent={(props) => <DrawerScreen {...props} />}
      >
        <Drawer.Screen name="index" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
