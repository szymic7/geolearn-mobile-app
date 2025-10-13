import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import CustomBtn from "../components/ui/CustomBtn";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.img}
        source={require("../assets/images/bg-login.png")}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={120}
        >
          <ScrollView
            contentContainerStyle={styles.center}
            // keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.header}>
              Join GeoLearn and start your journey
            </Text>
            <View style={styles.form}>
              <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  placeholder="Mateusz"
                  keyboardType="text"
                  right={<TextInput.Icon icon="account" />}
                  mode="outlined"
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="bleksy@gmail.com"
                  keyboardType="email-address"
                  right={<TextInput.Icon icon="email" />}
                  mode="outlined"
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="Password"
                  secureTextEntry={true}
                  right={<TextInput.Icon icon="lock" />}
                  mode="outlined"
                />
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
              <CustomBtn type="green">Sign up</CustomBtn>
              <Text>
                Have already account?{" "}
                <Text style={styles.underline}>Login</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 12,
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
  underline: {
    textDecorationLine: "underline",
  },
});
