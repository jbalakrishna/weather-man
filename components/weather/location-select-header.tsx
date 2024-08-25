import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TLocationSelectHeaderProps = {
  locationText: string;
  handleLocationModal: () => void;
  handleRefresh: () => void;
  timeAgo: string;
};

export const LocationSelectHeader = ({
  locationText,
  handleLocationModal,
  handleRefresh,
  timeAgo,
}: TLocationSelectHeaderProps) => {
  return (
    <View className="flex-none py-2 px-4 flex-row justify-between bg-white">
      <TouchableOpacity onPress={handleLocationModal}>
        <View className="flex-row border-2 rounded-full gap-3 border-slate-400 py-3 px-6 border-radius-8">
          <Text className="font-semibold text-l text-slate-700 text-primary">
            {locationText}
          </Text>
          <Ionicons name="chevron-down" size={16} />
        </View>
      </TouchableOpacity>
      {timeAgo && (
        <TouchableOpacity onPress={handleRefresh}>
          <View className="py-2 mt-2 flex-row gap-2">
            <Text className="text-right text-base font-medium text-slate-500">
              {timeAgo}
            </Text>
            <Ionicons name="refresh-sharp" size={18} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
