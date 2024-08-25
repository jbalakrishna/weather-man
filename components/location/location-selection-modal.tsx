import {
  LocationErrorDenied,
  LocationErrorGeneric,
} from "@/components/common/errors";
import { fetchLocationsAutoComplete } from "@/lib/network/apis";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { throttle } from "lodash";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import useWeatherStore from "../weather/store";

export default function LocationSelectionModal({
  locationText,
  modalVisible,
  onClose,
}: {
  locationText: string;
  modalVisible: boolean;
  onClose: () => void;
}) {
  const pan = useRef(new Animated.Value(300)).current;
  const inputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [autocompleteLocations, setAutocompleteLocations] = useState<any[]>([]);
  const store = useWeatherStore();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dy: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80) {
          Animated.timing(pan, {
            toValue: 500,
            duration: 100,
            useNativeDriver: false,
          }).start(() => {
            clearStates();
            onClose();
            pan.setValue(300);
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(pan, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  const fetchLocation = async () => {
    setLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        store.setError(LocationErrorDenied);
      } else {
        let location = await Location.getCurrentPositionAsync({});
        store.setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        store.fetchWeather();
        showToast();
      }
    } catch (error) {
      store.setError(LocationErrorGeneric);
    } finally {
      setLoading(false);
      clearStates();
      onClose();
    }
  };

  const clearStates = () => {
    setAutocompleteLocations([]);
    setQuery("");
  };

  const showToast = () => {
    ToastAndroid.show("Location updated!", ToastAndroid.SHORT);
  };

  const fetchLocationAutoComplete = async (query: string) => {
    setLoading(true);
    try {
      const locations = await fetchLocationsAutoComplete(query);
      setAutocompleteLocations(locations);
    } catch (error) {
      store.setError(LocationErrorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const onSelectLocation = async (location: any) => {
    store.setLocation({
      latitude: location.lat,
      longitude: location.lon,
    });
    await store.fetchWeather();
    showToast();
    clearStates();
    onClose();
  };

  const handleClose = () => {
    clearStates();
    onClose();
    pan.setValue(300);
  };

  const handleQueryChange = async (query: string) => {
    setQuery(query);
    if (query.length >= 4) {
      throttle(
        () => {
          fetchLocationAutoComplete(query);
        },
        500,
        { trailing: true }
      )();
    }
  };

  return modalVisible ? (
    <Animated.View
      style={{ transform: [{ translateY: pan }] }}
      className="absolute rounded-2xl shadow-black bottom-0 left-0 right-0 top-0 flex-1 bg-slate-100 shadow-2xl  px-4 py-6"
      {...panResponder.panHandlers}
    >
      <ScrollView>
        <View className="flex-1">
          <View className="flex-row justify-between">
            <View className="flex-1 gap-4">
              <Text className="font-bold">Change Location For Weather</Text>

              <Text className="color-slate-500 font-medium">
                {locationText}
              </Text>
            </View>
            <TouchableOpacity onPressOut={handleClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            ref={inputRef}
            className="mt-8 px-4 py-2 border-2 border-slate-400 rounded-full"
            placeholder="Search for a city"
            value={query}
            onChange={(e) => handleQueryChange(e.nativeEvent.text)}
            onPressOut={() => {
              inputRef.current?.focus();
            }}
            editable
          />
          {loading && (
            <Text className="text-slate-400mt-8 px-4">Fetching...</Text>
          )}
          {store.error && (
            <Text className="text-red-500 mt-8 px-4">
              {store.error.message}
            </Text>
          )}

          {autocompleteLocations.length > 0 && (
            <View className="flex-1">
              {autocompleteLocations.map((location, idx) => (
                <View key={idx}>
                  <TouchableOpacity
                    onPressOut={() => onSelectLocation(location)}
                  >
                    <View
                      key={location.id}
                      className="flex-row border-b py-4 px-6 border-slate-300"
                    >
                      <Text>{location.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity className="py-8" onPressOut={fetchLocation}>
            <View>
              <View className="flex-row gap-2 align-center rounded-full px-4 py-2">
                <Ionicons name="location-outline" size={18} color="stone" />
                <Text className="font-medium  text-stone-700 pt-0.5">
                  Use Current Location Instead
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  ) : (
    <Fragment></Fragment>
  );
}
