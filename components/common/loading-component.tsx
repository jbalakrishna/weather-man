import { Fragment, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";

type TLoadingScreenProps = {
  visible: boolean;
};

const LoadingScreen = (props: TLoadingScreenProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [props.visible]);

  return props.visible ? (
    <Animated.View
      className="absolute top-0 bottom-0 left-0 right-0 bg-slate-100 opacity-75 items-center justify-center"
      style={{ opacity }}
    >
      <View className="flex-1 gap-4 justify-center">
        <ActivityIndicator size="large" color="grey" />
        <Text className="text-slate-500 font-semibold">
          Fetching your weather info...
        </Text>
      </View>
    </Animated.View>
  ) : (
    <Fragment></Fragment>
  );
};

export default LoadingScreen;
