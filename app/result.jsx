import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../utils/colors";
import BurgerMenuButton from "../components/ui/BurgerMenuButton";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Result({onPress}) {

    const { correctAnswers, numOfQuestions } = useLocalSearchParams();

    const correct = Number(correctAnswers) || 0;
    const total = Number(numOfQuestions) || 1;

    return (
        <View style={styles.container}>

            <View style={styles.burgerArea}>
                <BurgerMenuButton />
            </View>

            <View style={styles.resultPanel}>
                <Text style={[styles.font, styles.head, styles.congrats]}>Congratulations!</Text>
                <Text style={[styles.font, styles.head, styles.trophies]}>🏆🏆🏆</Text>
                <Text style={[styles.font, styles.yscore]}>Your score:</Text>
                <Text style={[styles.font, styles.percent]}>
                    {Math.round((correct / total) * 100)}%
                </Text>
                <Text style={[styles.font, styles.yscore]}>
                    Correct answers: <Text style={{fontWeight: 'bold'}}>{correct}/{total}</Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.back}>
                        <Text style={styles.buttonText}>Back to home</Text>
                    </Pressable>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
    },

    burgerArea: {
        position: 'absolute',
        top: 12,
        left: 13.5,
        zIndex: 10,
    },

    resultPanel: {
        backgroundColor: Colors.secondary,
        width: 290,
        height: 412,
        borderColor: Colors.textPrimary,
        borderWidth: 1,
        borderRadius: 35,

        //shadows
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.27,
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 4,
        elevation: 6,

        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
    },

    font:{
        fontFamily: "Montserrat",
        color: Colors.textPrimary,
    },

    head:{
        fontSize: 28,
        letterSpacing: 0.8,
    },

    congrats: {
        marginBottom: 6,
    },

    trophies:{
        marginBottom: 24,
    },

    yscore:{
        marginBottom: 2,
        letterSpacing: 0.3,
        fontSize: 14,
    },

    percent:{
        fontWeight: 800,
        letterSpacing: 0.8,
        fontSize: 96,
        marginBottom: 10,
    },

    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',

        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.27,
        shadowOffset: { width: 0.5, height: 2 },
        shadowRadius: 2,
        elevation: 5,
    },

    back:{
        height: 58,
        width: 140,
        borderWidth: 2,
        borderRadius: 19,
        borderColor: Colors.textPrimary,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primaryLight,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.background,
    }

});