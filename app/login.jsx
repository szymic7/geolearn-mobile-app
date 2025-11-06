import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import CustomBtn from "../components/ui/CustomBtn";
import ThemedText from "../components/ui/ThemedText";
import { useAuth } from "../contexts/authContext";
import Colors from "../utils/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { login, loading, authError, clearError } = useAuth();

  function validate() {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    const ok = validate();
    if (ok) {
      const success = await login(email, password);
      if (success) {
        router.navigate("/home");
      }
    }
  }

  //TODO: fix clear authError when user starts typing new data in TextInput
  useEffect(
    function () {
      clearError();
    },
    [clearError]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.img}
        source={require("../assets/images/bg-login.png")}
        resizeMode="cover"
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid={true}
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <ThemedText size={32} style={styles.header}>
              Welcome back to GeoLearn
            </ThemedText>
            <View style={styles.row}>
              <ThemedText.Medium size={18} style={styles.label}>
                Email
              </ThemedText.Medium>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error.email)
                    setError((e) => ({ ...e, email: undefined }));
                }}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                right={<TextInput.Icon icon="email" />}
                mode="outlined"
              />
              {error.email && (
                <ThemedText.Medium
                  size={12}
                  color={Colors.error}
                  style={styles.error}
                >
                  {error.email}
                </ThemedText.Medium>
              )}
            </View>
            <View style={styles.row}>
              <ThemedText.Medium size={18} style={styles.label}>
                Password
              </ThemedText.Medium>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error.password)
                    setError((e) => ({ ...e, password: undefined }));
                }}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                right={<TextInput.Icon icon="lock" />}
                mode="outlined"
              />

              {error.password && (
                <ThemedText.Medium
                  size={12}
                  color={Colors.error}
                  style={styles.error}
                >
                  {error.password}
                </ThemedText.Medium>
              )}
            </View>
            <CustomBtn type="green" onPress={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </CustomBtn>
            {authError && (
              <ThemedText.Medium
                size={12}
                color={Colors.error}
                style={styles.error}
              >
                {authError}
              </ThemedText.Medium>
            )}
            <ThemedText.Medium>
              New in GeoLearn?{" "}
              <Link screen="register" style={styles.link}>
                Sign up{" "}
              </Link>
            </ThemedText.Medium>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  },
  header: {
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  input: {
    width: 280,
    height: 50,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 11,
    maxLength: 80,
  },
  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  label: {
    marginLeft: -10,
  },
  link: {
    textDecorationLine: "underline",
    color: Colors.textPrimary,
  },
  error: {
    marginTop: 4,
  },
});
