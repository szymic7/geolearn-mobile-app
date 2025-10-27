import {Pressable, StyleSheet, Text} from "react-native";
import React from "react";
import Colors from "../../utils/colors";

export default function QuizButton({
                                       text,
                                       onPress,
                                       isSelected,
                                       disabled,
                                       showResult,
                                       isCorrect,
                                       isChosen,
                                   }) {

    let buttonStyle = [styles.quizButton];
    let textStyle = [styles.text];

    if (!showResult && isSelected) {
        buttonStyle.push(styles.selectedButton);
    }

    if (showResult) {
        if (isCorrect)
        {
            textStyle.push(styles.correctText);
        }
        else if (isChosen && !isCorrect)
        {
            textStyle.push(styles.incorrectText);
        }
    }

    return (
        <Pressable style={buttonStyle} onPress={!disabled ? onPress : null}>
            <Text style={textStyle}>{text}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({

    quizButton: {
        height: 58,
        borderWidth: 2,
        borderRadius: 19,
        borderColor: Colors.textPrimary,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    selectedButton: {
        backgroundColor: Colors.secondary,
    },

    text: {
        fontFamily: "Montserrat",
        color: Colors.textPrimary,
    },

    correctText: {
        color: Colors.correctAnswer,
    },

    incorrectText: {
        color: Colors.wrongAnswer,
    },

});