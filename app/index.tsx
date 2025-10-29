import { useAuth } from "@/contexts/authContext";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { logout } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <TouchableOpacity onPress={logout}>
        <Text>Logout (auto login testing)</Text>
      </TouchableOpacity>
      <Link href="/landing">Click here to see auth landing page</Link>
      <Link href="/login">Click here to see login page</Link>
      <Link href="/register">Click here to see register page</Link>
      <Link href="/home">Home</Link>
      <Link href="/regionChoiceFlags">Learn flags</Link>
      <Link href="/regionChoiceCapitals">Learn capitals</Link>
      <Link href="/quizChoice">Quiz Choice</Link>
      <Link href="/continentsChoiceQuiz">Continents Choice Quiz</Link>
      <Link href="/quiz">Quiz</Link>
    </View>
  );
}
