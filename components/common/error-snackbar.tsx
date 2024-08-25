import useIsOffline from "@/components/common/hooks/useIsOffline";
import { delay } from "lodash";
import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
const errorContainerClass = "bg-red-600 px-8 justify-center align-center";
const offlineContainerClass = "bg-slate-200 px-8 justify-center align-center";

const ErrorSnackbar = ({ error }: any) => {
  const height = useRef(new Animated.Value(0)).current;
  const showOfflineMode = useIsOffline();

  useEffect(() => {
    if (error || showOfflineMode) {
      Animated.timing(height, {
        toValue: 44,
        duration: 200,
        useNativeDriver: false,
      }).start();
      if (error) {
        delay(() => {
          Animated.timing(height, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            height.setValue(0);
          });
        }, 5000);
      }
      return;
    }

    if (!showOfflineMode) {
      Animated.timing(height, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    return () => {
      height.setValue(0);
    };
  }, [error, showOfflineMode]);

  return (
    <Animated.View
      className={error ? errorContainerClass : offlineContainerClass}
      style={{ height }}
    >
      {error ? (
        <Text className="text-slate-100 font-semibold">
          {
            "There was a problem with your last request. \nPlease try again after some time."
          }
        </Text>
      ) : (
        <Text className="text-slate-500 font-semibold">
          {"Looks like you're offline!"}
        </Text>
      )}
    </Animated.View>
  );
};

export default ErrorSnackbar;
