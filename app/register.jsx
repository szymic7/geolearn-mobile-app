import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import CustomBtn from "../components/ui/CustomBtn";
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

  //TODO: fix clear authError when user starts typing new data in TextInput
  useEffect(
    function () {
      clearError();
    },
    [clearError]
  );

  return (
    <ImageBackground
      style={styles.img}
      source={require("../assets/images/bg-login.png")}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.header}>
              Join GeoLearn and start your journey
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
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
              {error.name && <Text style={styles.error}>{error.name}</Text>}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error.email)
                    setError((e) => ({ ...e, email: undefined }));
                }}
                value={email}
                placeholder="bleksy@gmail.com"
                keyboardType="email-address"
                right={<TextInput.Icon icon="email" />}
                mode="outlined"
              />
              {error.email && <Text style={styles.error}>{error.email}</Text>}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Password</Text>
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
                <Text style={styles.error}>{error.password}</Text>
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Repeat Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setRepeatPassword(text)}
                value={repeatPassword}
                placeholder="Password"
                secureTextEntry={true}
                right={<TextInput.Icon icon="lock" />}
                mode="outlined"
              />
            </View>
            <CustomBtn type="green" onPress={handleSubmit}>
              {loading ? "Loading..." : "Sign up"}
            </CustomBtn>
            {authError && <Text style={styles.error}>{authError}</Text>}
            <Text>
              Have already account?{" "}
              <Link screen="login" style={styles.link}>
                Login
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  header: {
    color: Colors.textPrimary,
    fontSize: 32,
    textAlign: "center",
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
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 500,
    marginLeft: -10,
  },
  alignRight: {
    textAlign: "right",
  },
  link: {
    color: Colors.textPrimary,
    textDecorationLine: "underline",
  },
  error: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});
