import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function CustomBtn({ type, onPress, title }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.btn}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",

    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 19,
  },
  text: {
    fontWeight: 700,
    fontFamily: "Montserrat",
    fontSize: 16,
  },
});
