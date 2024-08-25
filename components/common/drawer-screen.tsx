import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Switch, Text, View } from "react-native";
import useSettingsStore from "./settings/store";

type TSwitchItemProps = {
  handleSwitchToggle: () => void;
  enabled: boolean;
  text: string;
};

const SwitchItem = ({
  handleSwitchToggle,
  enabled,
  text,
}: TSwitchItemProps) => {
  return (
    <View className="flex-1 flex-row align-center justify-between pr-16 border-b pb-2 border-slate-200">
      <Text className="font-medium text-l text-slate-600 py-2">{text}</Text>
      <Switch
        value={enabled}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor="#f4f3f4"
        onValueChange={handleSwitchToggle}
      ></Switch>
    </View>
  );
};

const DrawerScreen = (props: any) => {
  const settingStore = useSettingsStore();
  const handleUnitsChange = () => {
    settingStore.setUnits(
      settingStore.units === "metric" ? "imperial" : "metric"
    );
  };

  const handleOfflineModeChange = () => {
    settingStore.setOfflineMode(!settingStore.offlineMode);
  };

  return (
    <View className="flex-1 py-12 bg-slate-100">
      <DrawerContentScrollView {...props}>
        <View className="flex-1 gap-12 ">
          <View className="flex-1 bg-slate-100">
            <DrawerItemList {...props} />
          </View>
          <View className="flex-1 px-4 pt-4 gap-4 bg-slate-100 border-t-2 border-slate-200 ">
            <Text className="font-bold text-xl text-slate-600">
              Preferences
            </Text>
            <SwitchItem
              handleSwitchToggle={handleUnitsChange}
              enabled={settingStore.units === "imperial"}
              text={"Use Imperial Units\n(Fahrenheit, mph)"}
            />
            <SwitchItem
              handleSwitchToggle={handleOfflineModeChange}
              enabled={settingStore.offlineMode}
              text={"Offline mode"}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerScreen;
