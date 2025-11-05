import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import Header from "../../components/ui/Header";
import HomeTileButton from "../../components/ui/HomeTileButton";
import { fetchUserBestScores } from "../../services/quizService";
import Colors from "../../utils/colors";

export default function QuizCategoryChoice() {
  const router = useRouter();
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchUserBestScores();
        setScores(data);
      } catch (error) {
        console.error("❌ Failed to fetch user scores:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  const handleSelectCategory = (category) => {
    if (category === "mixed") {
      router.push({
        pathname: "/quizRegionChoice",
        params: { ...scores?.mixed },
      });
    } else {
      router.push({
        pathname: "/quiz",
        params: { category },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primaryDark} />
      </View>
    );
  }

  const flagsScore = scores?.flags ?? 0;
  const capitalsScore = scores?.capitals ?? 0;
  const mixedScores = scores?.mixed ?? {};

  // Compute progress values (normalized to 0–1 range)
  const flagsProgress = flagsScore / 30;
  const capitalsProgress = capitalsScore / 30;

  // Sum all subcategory scores in 'mixed'
  const mixedTotal = Object.values(mixedScores).reduce((a, b) => a + b, 0);
  const mixedProgress = mixedTotal / 70;

  return (
    <View style={styles.container}>
      <View style={styles.burgerArea}>
        <BurgerMenuButton />
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <Header title="Choose your quiz category" />

        <View style={styles.tilesContainer}>
          <HomeTileButton
            title="Flags"
            imageSource={require("../../assets/images/img_flags.png")}
            showProgress={true}
            progress={flagsProgress}
            onPress={() => handleSelectCategory("flags")}
          />
          <HomeTileButton
            title="Maps"
            imageSource={require("../../assets/images/img_maps.png")}
            showProgress={true}
            progress={0.6}
          />
          <HomeTileButton
            title="Capitals"
            imageSource={require("../../assets/images/img_capitals.png")}
            showProgress={true}
            progress={capitalsProgress}
            onPress={() => handleSelectCategory("capitals")}
          />
          <HomeTileButton
            title="Mixed"
            imageSource={require("../../assets/images/img_mixed.png")}
            showProgress={true}
            progress={mixedProgress}
            onPress={() => handleSelectCategory("mixed")}
          />
        </View>
      </ScrollView>
    </View>
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
    top: 12,
    left: 13.5,
    zIndex: 10,
  },

  mainContent: {
    flex: 1,
    width: 280,
    height: "100%",
    justifyContent: "space-between",
    paddingTop: "4%",
    paddingBottom: "11%",
  },

  tilesContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
    paddingHorizontal: 5,
  },
});
