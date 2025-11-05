import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import BurgerMenuButton from "../components/ui/BurgerMenuButton";
import QuizButton from "../components/ui/QuizButton";
import SubmitNextButton from "../components/ui/SubmitNextButton";
import Timer from "../components/ui/Timer";
import { QUIZ_ENDPOINTS } from "../constants/api";
import { fetchAllQuestions } from "../services/quizService";
import Colors from "../utils/colors";

export default function Quiz() {
    const { category } = useLocalSearchParams();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState(-1);
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loadQuestions = async () => {
        try {
            const data = await fetchAllQuestions(category);
            setQuestions(data);
        } catch (err) {
            setError("Failed to load quiz questions. Please try again later.");
        } finally {
            setLoading(false);
        }
        };

        loadQuestions();
    }, []);

    const handleSubmit = () => {
        if (selected !== -1) {
            const result = selected === questions[currentIndex].correctAnswerIndex;
            setSubmitted(true);
            if (result) { 
                setCorrectCount((prev) => prev + 1);
            }
        }
    };

    const handleNext = async () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
            setSelected(-1);
            setSubmitted(false);
        } else {
            try {
                const token = await SecureStore.getItemAsync("token");

                if (!token) {
                    console.warn("No auth token found");
                    return;
                }

                // Prepare payload
                const payload = 
                category === "flags" || category === "capitals"
                    ? { category, subcategory: "world", score: correctCount }
                    : { category: "mixed", subcategory: category, score: correctCount };

                // Send POST request
                const response = await fetch(QUIZ_ENDPOINTS.SUBMIT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    console.error("Failed to save result:", response.status);
                }
                
            } catch (error) {
                console.error("Error saving result:", error);
            }
            router.push({
                pathname: "/result",
                params: {
                    correctAnswers: correctCount,
                    numOfQuestions: questions.length,
                },
            });
        }
    };

    if (loading) {
        return (
        <View style={[styles.container, { justifyContent: "center" }]}>
            <ActivityIndicator size="large" color={Colors.primaryDark} />
            <Text style={{ marginTop: 20, color: Colors.secondary }}>
                Loading questions...
            </Text>
        </View>
        );
    }

    if (error) {
        return (
        <View style={[styles.container, { justifyContent: "center" }]}>
            <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
            <Text style={{ color: Colors.secondary }}>Please restart the quiz.</Text>
        </View>
        );
    }

    if (questions.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: "center" }]}>
                <Text style={{ color: Colors.secondary }}>No questions available.</Text>
            </View>
        );
    }

    const current = questions[currentIndex];
    const { question, answers, correctAnswerIndex } = current;

    return (
        <View style={styles.container}>
            <View style={styles.burgerArea}>
                <BurgerMenuButton />
            </View>

            <View style={styles.topSection}>
                <View style={styles.additions}>
                    <Text style={styles.addText}>
                        {currentIndex + 1}/{questions.length}
                    </Text>

                    <Timer
                        key={currentIndex}
                        startSeconds={20}
                        disabled={submitted}
                        onFinish={() => {
                        if (!submitted) setSubmitted(true);
                        }}
                    />
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionStyle}>{question}</Text>
                </View>
            </View>

            <View style={styles.middleSection}>
                <View style={styles.answersContainer}>
                    {answers.map((answer, index) => (
                        <QuizButton
                            key={index}
                            text={answer}
                            isSelected={selected === index}
                            onPress={() => setSelected(index)}
                            disabled={submitted}
                            showResult={submitted}
                            isCorrect={index === correctAnswerIndex}
                            isChosen={selected === index}
                        />
                    ))}
                </View>

                <SubmitNextButton
                    submitted={submitted}
                    onSubmit={handleSubmit}
                    onNext={handleNext}
                />
            </View>
        </View>
    );
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
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 0.2,
    },

    addText:{
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
    },

});