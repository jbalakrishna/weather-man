import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { ErrorType } from "./errors";
import { Error } from "./types";

type TErrorScreenProps = {
  error: Error | null;
  handleRetry: () => void;
};

const errorImage = "https://i.ibb.co/1vHrDq1/1326461-2.png";

const ErrorScreen = ({ error, handleRetry }: TErrorScreenProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [error]);

  const canRetry =
    error?.errorType === ErrorType.GENERIC ||
    error?.errorType === ErrorType.WEATHER_FETCH_ERROR;

  return error ? (
    <Animated.View
      className="flex-1 bg-slate-100 opacity-75 items-center justify-center"
      style={{ opacity }}
    >
      <View className="flex-1 gap-4 justify-center align-center">
        <Image
          resizeMode="contain"
          className="h-40"
          source={{ uri: errorImage }}
        />

        <Text className="px-16 text-center text-red-500 font-semibold">
          {error.message}
        </Text>
        {canRetry && (
          <TouchableOpacity onPress={handleRetry}>
            <View className="justify-center py-2 px-6 flex-row gap-2">
              <Text className="text-right text-base font-semibold font-xl text-slate-500">
                Retry
              </Text>
              <Ionicons name="refresh-sharp" size={18} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  ) : (
    <Fragment></Fragment>
  );
};

export default ErrorScreen;
