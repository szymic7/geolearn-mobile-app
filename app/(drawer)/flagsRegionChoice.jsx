import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import ContinentsTileButton from "../../components/ui/ContinentsTileButton";
import Header from "../../components/ui/Header";
import Colors from "../../utils/colors";

export default function FlagsRegionChoice() {
  const router = useRouter();

  const handleSelectRegion = (region) => {
    router.push({
      pathname: "/flags",
      params: { region },
    });
  };

  return (
    <ScreenLayout style={{ backgroundColor: Colors.primaryLight }}>
      <View style={styles.container}>
        <View style={styles.burgerArea}>
          <BurgerMenuButton />
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
          <Header title="Which flags do you want to learn?" />

          <View style={styles.tilesContainer}>
            <ContinentsTileButton
              title="Europe"
              imageSource={require("../../assets/images/Europe_cc.png")}
              onPress={() => handleSelectRegion("europe")}
            />
            <ContinentsTileButton
              title="Asia"
              imageSource={require("../../assets/images/Asia_cc.png")}
              onPress={() => handleSelectRegion("asia")}
            />
            <ContinentsTileButton
              title="Africa"
              imageSource={require("../../assets/images/Africa_cc.png")}
              onPress={() => handleSelectRegion("africa")}
            />
            <ContinentsTileButton
              title="North America"
              imageSource={require("../../assets/images/NorthAmerica_cc.png")}
              onPress={() => handleSelectRegion("north_america")}
            />
            <ContinentsTileButton
              title="South America"
              imageSource={require("../../assets/images/SouthAmerica_cc.png")}
              onPress={() => handleSelectRegion("south_america")}
            />
            <ContinentsTileButton
              title="Australia"
              imageSource={require("../../assets/images/Australia_cc.png")}
              onPress={() => handleSelectRegion("australia")}
            />
            <ContinentsTileButton
              title="World"
              imageSource={require("../../assets/images/World_cc.png")}
              onPress={() => handleSelectRegion("world")}
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
    width: 280,
    height: "100%",
    justifyContent: "space-between",
    marginVertical: "5%",
  },

  tilesContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
  },
});
