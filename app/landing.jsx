import { Image, StyleSheet, Text, View } from "react-native";
import CustomBtn from "../components/ui/CustomBtn";

export default function Landing() {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          style={styles.image}
          source={require("../assets/images/geolearn-logo-transparent.png")}
        ></Image>
        <Text style={styles.text}>
          Your journey to world knowledge start here
        </Text>
      </View>
      <View style={styles.actions}>
        <Text color="#000000">Lets get started</Text>
        <CustomBtn title="Login" onPress="" type=""></CustomBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3ABB51",
    flex: 1,
  },
  logoBox: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 300,
    height: 84,
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 13,
  },
  actions: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 56,
    paddingRight: 56,
  },
  btn: {
    backgroundColor: "#D9D9D9",
  },
});
