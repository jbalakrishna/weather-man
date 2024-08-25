import { delay } from "lodash";
import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

const ErrorSnackbar = ({ error }: any) => {
  const height = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.timing(height, {
        toValue: 44,
        duration: 200,
        useNativeDriver: false,
      }).start();
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

    return () => {
      height.setValue(0);
    };
  }, [error]);

  return (
    <Animated.View
      className="bg-red-600 px-8 justify-center align-center"
      style={{ height }}
    >
      <Text className="text-slate-100 font-semibold">
        {
          "There was a problem with your last request. \nPlease try again after some time."
        }
      </Text>
    </Animated.View>
  );
};

export default ErrorSnackbar;
