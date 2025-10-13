import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function CustomBtn({ type, onPress, children }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.btn, styles[type]]}>
        <Text style={[textStyles.text, textStyles[type]]}>{children}</Text>
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
    height: 50
  },


  gray: {
    backgroundColor: "#D9D9D9",
  },
  green: {
    backgroundColor: "#3ABB51",
    color: "#fff"
  }
});

const textStyles = StyleSheet.create({
    text: {
    fontWeight: 700,
    fontFamily: "Montserrat",
    fontSize: 16,
  },
  green: {
    color: "#fff",
  },
  gray: {
    color: "#000",
  }
})