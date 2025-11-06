import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import CustomBtn from "../components/ui/CustomBtn";
import ThemedText from "../components/ui/ThemedText";
import { useAuth } from "../contexts/authContext";
import Colors from "../utils/colors";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({});

  const { register, loading, authError, clearError } = useAuth();

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(name))
      newErrors.name = "Only letters and spaces allowed";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password !== repeatPassword)
      newErrors.password = "Passwords do not match";

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    const ok = validate();
    if (ok) {
      const success = await register({ name, email, password });
      if (success) {
        Alert.alert(
          "Success",
          "Congratulations, your account has been successfully created."
        );
        router.navigate("/login");
      }
    }
  }

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
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
            Join GeoLearn and start your journey
          </ThemedText>

          <View style={styles.row}>
            <ThemedText.Medium size={18} style={styles.label}>
              Name
            </ThemedText.Medium>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setName(text);
                if (error.name) setError((e) => ({ ...e, name: undefined }));
              }}
              value={name}
              placeholder="Mateusz"
              keyboardType="text"
              right={<TextInput.Icon icon="account" />}
              mode="outlined"
            />
            {error.name && (
              <ThemedText.Medium
                size={12}
                color={Colors.error}
                style={styles.error}
              >
                {error.name}
              </ThemedText.Medium>
            )}
          </View>

          <View style={styles.row}>
            <ThemedText.Medium size={18} style={styles.label}>
              Email
            </ThemedText.Medium>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
                if (error.email) setError((e) => ({ ...e, email: undefined }));
              }}
              value={email}
              placeholder="bleksy@gmail.com"
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

          <View style={styles.row}>
            <ThemedText.Medium size={18} style={styles.label}>
              Repeat password
            </ThemedText.Medium>
            <TextInput
              style={styles.input}
              onChangeText={setRepeatPassword}
              value={repeatPassword}
              placeholder="Password"
              secureTextEntry={true}
              right={<TextInput.Icon icon="lock" />}
              mode="outlined"
            />
          </View>

          <CustomBtn type="green" onPress={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
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
            Have already account?{" "}
            <Link screen="login" style={styles.link}>
              Login
            </Link>
          </ThemedText.Medium>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    textAlign: "center",
  },
  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  label: {
    marginLeft: -10,
  },
  input: {
    width: 280,
    height: 50,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 11,
  },
  link: {
    color: Colors.textPrimary,
    textDecorationLine: "underline",
  },
  error: {
    marginTop: 4,
  },
});
