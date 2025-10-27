import {StyleSheet, Text, View} from "react-native";
import BurgerMenuButton from "../components/ui/BurgerMenuButton";
import React, {useEffect, useState} from "react";
import Colors from "../utils/colors";
import QuizButton from "../components/ui/QuizButton";
import SubmitNextButton from "../components/ui/SubmitNextButton";
import Timer from "../components/ui/Timer";

export default function Quiz(
    {currentQuestion = "1",
        numOfQuestions = "1",
        question = "Kiedy zgolisz brode",
        answer0 = "Nigdy",
        answer1 = "Zaraz",
        answer2 = "Facet bez brody",
        answer3 = "Jest jak krowa bez ogona",
        correctAnswer = 0}) {

    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(-1);

    useEffect(() => {
        if (submitted && selected !== -1) {
            setIsCorrect(selected === correctAnswer);
        }
    }, [submitted, selected]);

    return <View style={styles.container}>

        <View style={styles.burgerArea}>
            <BurgerMenuButton/>
        </View>

        <View style={styles.topSection}>

            <View style={styles.additions}>

                <Text style={styles.addText}> {currentQuestion}/{numOfQuestions} </Text>

                <Timer
                    startSeconds={30}
                    disabled={submitted}
                    onFinish={() => {
                        if (!submitted) setSubmitted(true);
                    }}
                />

            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionStyle}>
                    {question}
                </Text>
            </View>

        </View>

        <View style={styles.middleSection}>
            <View style={styles.answersContainer}>
                {[answer0, answer1, answer2, answer3].map((answer, index) => (
                    <QuizButton
                        key={index}
                        text={answer}
                        isSelected={selected === index}
                        onPress={() => setSelected(index)}
                        disabled={submitted}
                        showResult={submitted}
                        isCorrect={index === correctAnswer}
                        isChosen={selected === index}
                    />
                ))}
            </View>

            <SubmitNextButton
                submitted={submitted}
                onSubmit={() => setSubmitted(true)}
            />
        </View>

    </View>
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        gap: 60,
    },

    burgerArea: {
        position: 'absolute',
        top: 12,
        left: 13.5,
        zIndex: 10,
    },

    topSection: {
        width: 360,
        flexDirection: "column",
        gap: 55,
    },

    additions: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    questionContainer: {
        width: 320,
        height: "auto",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    middleSection: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginBottom: 120,
    },

    answersContainer: {
        width: 280,
        height: "auto",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },

    questionStyle:{
        textAlign: 'center',
        width: '100%',
        fontSize: 18,
        fontFamily: 'Montserrat',
        letterSpacing: 0.2,
        fontWeight: '700',
    },

    addText:{
        fontSize: 13,
        fontFamily: 'Montserrat',
        fontWeight: '500',
    },

});