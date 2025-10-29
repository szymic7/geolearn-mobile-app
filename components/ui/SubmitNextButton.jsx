import {Pressable, StyleSheet, Text} from "react-native";
import Colors from "../../utils/colors";
import {useState} from "react";

export default function SubmitNextButton({ submitted = false, onSubmit, onNext }) {

    const handlePress = () => {
        if (!submitted && onSubmit) {
            onSubmit();
        } else if (submitted && onNext) {
            onNext();
        }
    };

    return (
        <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>
                {submitted ? "Next" : "Submit"}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    button: {
        height: 65,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 19,
        borderColor: Colors.textPrimary,
        backgroundColor: Colors.primaryLight,
    },

    text: {
        fontFamily: 'Montserrat',
        color: Colors.background,
        fontWeight: '700',
    },
});