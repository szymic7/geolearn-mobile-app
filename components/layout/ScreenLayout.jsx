import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../utils/colors";

export default function ScreenLayout({ style, children }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
