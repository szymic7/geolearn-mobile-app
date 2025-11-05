import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import Header from "../../components/ui/Header";
import HomeTileButton from "../../components/ui/HomeTileButton";
import Colors from "../../utils/colors";

export default function Home() {
  const router = useRouter();

  return (
    <ScreenLayout style={{ backgroundColor: Colors.primaryLight }}>
      <View style={styles.container}>
        <View style={styles.burgerArea}>
          <BurgerMenuButton />
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
          <Header title="What do you feel like learning today?" />

          <View style={styles.tilesContainer}>
            <HomeTileButton
              title="Learn Flags"
              imageSource={require("../../assets/images/img_flags.png")}
              onPress={() => router.push("/flagsRegionChoice")}
            />
            <HomeTileButton
              title="Learn Capitals"
              imageSource={require("../../assets/images/img_capitals.png")}
              onPress={() => router.push("/capitalsRegionChoice")}
            />
            <HomeTileButton
              title="Try yourself in quizzes"
              imageSource={require("../../assets/images/img_quizzes.png")}
              onPress={() => router.push("/quizCategoryChoice")}
            />
            <HomeTileButton
              title="Check Leaderboards"
              imageSource={require("../../assets/images/img_trophy.jpg")}
              onPress={() => router.push("/leaderboards")}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
  },

  burgerArea: {
    position: "absolute",
    top: 5,
    left: 13.5,
    zIndex: 10,
  },

  mainContent: {
    flex: 1,
    width: "80%",
    height: "100%",
    justifyContent: "space-between",
  },

  tilesContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
    paddingHorizontal: 5,
  },
});
