import { StyleSheet, TouchableHighlight, View } from "react-native";
import ThemedText from "./ThemedText";

export default function CustomBtn({
  type,
  onPress,
  disabled = false,
  children,
}) {
  return (
    <TouchableHighlight
      onPress={!disabled ? onPress : null}
      underlayColor="transparent"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <View style={[styles.btn, styles[type]]}>
        <ThemedText.SemiBold size={16} style={textStyles[type]}>
          {children}
        </ThemedText.SemiBold>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 19,
    // boxShadow:"5px 5px 5px 1px rgb(0, 0, 0,0.15)",
    width: 280,
    height: 50,
  },

  gray: {
    backgroundColor: "#D9D9D9",
  },
  green: {
    backgroundColor: "#3ABB51",
    color: "#fff",
  },
});

const textStyles = StyleSheet.create({
  green: {
    color: "#fff",
  },
  gray: {
    color: "#000",
  },
});
