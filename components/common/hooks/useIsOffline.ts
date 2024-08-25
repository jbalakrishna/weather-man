import { useNetInfo } from "@react-native-community/netinfo";

const useIsOffline = () => {
  const info = useNetInfo();
  return !(info.isConnected || info.isWifiEnabled || info.isInternetReachable);
};

export default useIsOffline;
