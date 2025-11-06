import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/navigation/BurgerMenuButton";
import Timer from "../../components/Timer";
import QuizButton from "../../components/ui/QuizButton";
import SubmitNextButton from "../../components/ui/SubmitNextButton";
import ThemedText from "../../components/ui/ThemedText";
import { QUIZ_ENDPOINTS } from "../../constants/api";
import { fetchAllQuestions } from "../../services/quizService";
import Colors from "../../utils/colors";

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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadQuestions = async () => {
        try {
          setLoading(true);
          setQuestions([]);
          setCurrentIndex(0);
          setSelected(-1);
          setSubmitted(false);
          setCorrectCount(0);
          setError(null);

          const data = await fetchAllQuestions(category);
          if (isActive) {
            setQuestions(data);
          }
        } catch (err) {
          setError(
            err.message +
              "Failed to load quiz questions. Please try again later."
          );
        } finally {
          if (isActive) setLoading(false);
        }
      };

      loadQuestions();

      return () => {
        isActive = false;
      };
    }, [category])
  );

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
        <ThemedText
          size={18}
          color={Colors.secondary}
          style={{ marginTop: 20 }}
        >
          Loading questions...
        </ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ThemedText size={18} color={Colors.error} style={{ marginBottom: 10 }}>
          {error}
        </ThemedText>
        <ThemedText size={18} color={Colors.secondary}>
          Please restart the quiz.
        </ThemedText>
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
    <ScreenLayout style={{ backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <View style={styles.burgerArea}>
          <BurgerMenuButton />
        </View>

        <View style={styles.topSection}>
          <View style={styles.additions}>
            <ThemedText size={15}>
              {currentIndex + 1}/{questions.length}
            </ThemedText>

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
            <ThemedText.Bold size={18} style={styles.questionStyle}>
              {question}
            </ThemedText.Bold>
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
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },

  burgerArea: {
    position: "absolute",
    top: 12,
    left: 13.5,
    zIndex: 10,
  },

  topSection: {
    width: "90%",
    flex: 1,
    maxHeight: "40%",
    flexDirection: "column",
    gap: 60,
  },

  additions: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  questionContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  middleSection: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minGap: 20,
    marginBottom: 60,
  },

  answersContainer: {
    width: "75%",
    height: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  questionStyle: {
    textAlign: "center",
    width: "100%",
    letterSpacing: 0.2,
  },
});
