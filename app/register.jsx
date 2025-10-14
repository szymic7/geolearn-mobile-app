import { Link } from "@react-navigation/native";
import { useState } from "react";
import {
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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    const ok = validate();
    if (ok) {
      alert("Account created successfully");
      //TODO: Implement registration logic
    }
  }

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
                  if (errors.name)
                    setErrors((e) => ({ ...e, name: undefined }));
                }}
                value={name}
                placeholder="Mateusz"
                keyboardType="text"
                right={<TextInput.Icon icon="account" />}
                mode="outlined"
              />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email)
                    setErrors((e) => ({ ...e, email: undefined }));
                }}
                value={email}
                placeholder="bleksy@gmail.com"
                keyboardType="email-address"
                right={<TextInput.Icon icon="email" />}
                mode="outlined"
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password)
                    setErrors((e) => ({ ...e, password: undefined }));
                }}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                right={<TextInput.Icon icon="lock" />}
                mode="outlined"
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
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
              Sign up
            </CustomBtn>
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
    color: "#000",
    fontSize: 32,
    textAlign: "center",
  },
  input: {
    width: 280,
    height: 50,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderRadius: 11,
    maxLength: 80,
  },

  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  label: {
    color: "#000",
    fontSize: 18,
    fontWeight: 500,
    marginLeft: -10,
  },
  alignRight: {
    textAlign: "right",
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
