import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link href="/landing">Click here to see auth landing page</Link>
      <Link href="/login">Click here to see login page</Link>
      <Link href="/register">Click here to see register page</Link>
      <Link href="/home">Home</Link>
      <Link href="/flagsAfrica">Flags - Africa</Link>
      <Link href="/flagsAsia">Flags - Asia</Link>
      <Link href="/flagsAustralia">Flags - Australia</Link>
      <Link href="/flagsEurope">Flags - Europe</Link>
      <Link href="/flagsNorthAmerica">Flags - North America</Link>
      <Link href="/flagsSouthAmerica">Flags - South America</Link>
      <Link href="/flagsWorld">Flags - World</Link>
      <Link href="/quizChoice">Quiz</Link>
      <Link href="/continentsChoice">Continents Choice</Link>
      <Link href="/continentsChoiceQuiz">Continents Choice Quiz</Link>
    </View>
  );
}
