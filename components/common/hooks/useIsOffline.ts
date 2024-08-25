import { useNetInfo } from "@react-native-community/netinfo";
import useSettingsStore from "../settings/store";

const useIsOffline = () => {
  const info = useNetInfo();
  const store = useSettingsStore();
  if (store.offlineMode) return true;
  return !(info.isConnected || info.isWifiEnabled || info.isInternetReachable);
};

export default useIsOffline;
