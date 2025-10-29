import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import BurgerMenuButton from "../components/ui/BurgerMenuButton";
import ContinentsTileButton from "../components/ui/ContinentsTileButton";
import Header from "../components/ui/Header";
import Colors from "../utils/colors";

export default function RegionChoiceFlags() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.burgerArea}>
        <BurgerMenuButton />
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <Header title="Which flags do you want to learn?" />

        <View style={styles.tilesContainer}>
          <ContinentsTileButton
            title="Europe"
            imageSource={require("../assets/images/Europe_cc.png")}
            onPress={() => router.push("/flagsEurope")}
          />
          <ContinentsTileButton
            title="Asia"
            imageSource={require("../assets/images/Asia_cc.png")}
            onPress={() => router.push("/flagsAsia")}
          />
          <ContinentsTileButton
            title="Africa"
            imageSource={require("../assets/images/Africa_cc.png")}
            onPress={() => router.push("/flagsAfrica")}
          />
          <ContinentsTileButton
            title="North America"
            imageSource={require("../assets/images/NorthAmerica_cc.png")}
            onPress={() => router.push("/flagsNorthAmerica")}
          />
          <ContinentsTileButton
            title="South America"
            imageSource={require("../assets/images/SouthAmerica_cc.png")}
            onPress={() => router.push("/flagsSouthAmerica")}
          />
          <ContinentsTileButton
            title="Australia"
            imageSource={require("../assets/images/Australia_cc.png")}
            onPress={() => router.push("/flagsAustralia")}
          />
          <ContinentsTileButton
            title="World"
            imageSource={require("../assets/images/World_cc.png")}
            onPress={() => router.push("/flagsWorld")}
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
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
    paddingHorizontal: 5,
  },
});
