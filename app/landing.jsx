import { router, useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomBtn from "../components/ui/CustomBtn";
import ThemedText from "../components/ui/ThemedText";
import { useAuth } from "../contexts/authContext";
import Colors from "../utils/colors";

export default function Landing() {
  const navigation = useNavigation();

  const { loginWithToken, isAuthenticated } = useAuth();

  useEffect(
    function () {
      async function checkLogin() {
        if (isAuthenticated) {
          router.navigate("/home");
          return;
        }

        const token = await SecureStore.getItemAsync("token");
        if (token) {
          await loginWithToken(token);
        }
      }
      checkLogin();
    },
    [isAuthenticated, loginWithToken]
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          style={styles.image}
          source={require("../assets/images/geolearn-logo-transparent.png")}
        ></Image>
        <ThemedText size={13} color={Colors.textInverse}>
          Your journey to world knowledge start here
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <ThemedText.SemiBold size={14}>Lets get started</ThemedText.SemiBold>
        <CustomBtn type="gray" onPress={() => navigation.navigate("login")}>
          Login
        </CustomBtn>
        <CustomBtn type="green" onPress={() => navigation.navigate("register")}>
          Register
        </CustomBtn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
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
  actions: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 56,
    paddingRight: 56,
    paddingTop: 28,
    paddingBottom: 56,
    gap: 20,
    alignItems: "center",
    boxShadow: "0px -7px 4px 0 rgb(0, 0, 0, 0.15)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
});
