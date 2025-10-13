import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomBtn from "../components/ui/CustomBtn";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return <View>
        <ImageBackground style={styles.img} source={require("../assets/images/bg-login.png")}>
        <View style={styles.center}>
        <Text style={styles.header}>Welcome back to GeoLearn</Text>
        <View style={styles.form}>
        <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
        keyboardType="email-address"
        right={<TextInput.Icon icon="email" />}
        mode="outlined"


        />
        </View >
        <View style={styles.row}>
            <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        right={<TextInput.Icon icon="lock" />}
        mode="outlined"
        />
        <Text style={[styles.alignRight, styles.underline]}>Forgot password</Text>
        </View>
        <CustomBtn type="green">Login</CustomBtn>
        <Text>New in GeoLearn? <Text style={styles.underline}>Sign up </Text></Text>
        </View>
        </View>
        </ImageBackground>
    </View>
}


const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: "100%",
    },
    header: {
        color: "#000",
        fontSize: 32,
        textAlign: "center"
    },
    input: {
        width: 280,
        height: 50,
        borderColor: "#aaa",
        backgroundColor: "#fff",
        borderRadius: 11,
        maxLength: 80,
    },
    center: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
    },
    form: {
        flexDirection: "column",
        alignItems: "center",
        gap: 24
    },
    label: {
        color: "#000",
        fontSize: 18,
        fontWeight: 500,
        marginLeft: -10
    },
    alignRight: {
        textAlign: "right",
    },
    underline: {
        textDecorationLine: "underline"

    }
})