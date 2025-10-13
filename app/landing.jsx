import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomBtn from "../components/ui/CustomBtn";

export default function Landing() {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          style={styles.image}
          source={require("../assets/images/geolearn-logo-transparent.png")}
        ></Image>
        <Text style={styles.logoText}>
          Your journey to world knowledge start here
        </Text>
      </View>
      <View style={styles.actions}>
        <Text style={styles.actionsText}>Lets get started</Text>
        <CustomBtn type="gray" onPress={() => navigation.navigate('login')}>Login</CustomBtn>
        <CustomBtn type="green" onPress="" >Register</CustomBtn>
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
  logoText: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 13,
  },
  actionsText: {
    color: "#000",
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 14,

  },
  actions: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 56,
    paddingRight: 56,
    paddingTop: 28,
    paddingBottom: 56,
    gap: 20,
    alignItems: "center",
    boxShadow: "0px -7px 4px 0 rgb(0, 0, 0, 0.15)"
  },
  center: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
