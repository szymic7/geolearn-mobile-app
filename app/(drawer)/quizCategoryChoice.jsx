import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import Header from "../../components/ui/Header";
import HomeTileButton from "../../components/ui/HomeTileButton";
import Colors from "../../utils/colors";

export default function QuizCategoryChoice() {
  const router = useRouter();

  const handleSelectCategory = (category) => {
    if (category === "mixed") {
      router.push("/quizRegionChoice");
    } else {
      router.push({
        pathname: "/quiz",
        params: { category },
      });
    }
  };

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
            progress={0.3}
            onPress={() => handleSelectCategory("flags")}
          />
          <HomeTileButton
            title="Capitals"
            imageSource={require("../../assets/images/img_capitals.png")}
            showProgress={true}
            progress={1}
            onPress={() => handleSelectCategory("capitals")}
          />
          <HomeTileButton
            title="Mixed"
            imageSource={require("../../assets/images/img_mixed.png")}
            showProgress={true}
            progress={0.7}
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
