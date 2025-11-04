import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import Header from "../../components/ui/Header";
import HomeTileButton from "../../components/ui/HomeTileButton";
import Colors from "../../utils/colors";

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={styles.burgerArea}>
          <BurgerMenuButton onPress={() => navigation.toggleDrawer()} />
        </View>

        <ScrollView contentContainerStyle={styles.mainContent}>
          <Header title="What do you feel like learning today?" />

          <View style={styles.tilesContainer}>
            <HomeTileButton
              title="Flags"
              imageSource={require("../../assets/images/img_flags.png")}
            />
            <HomeTileButton
              title="Maps"
              imageSource={require("../../assets/images/img_maps.png")}
            />
            <HomeTileButton
              title="Capitals"
              imageSource={require("../../assets/images/img_capitals.png")}
            />
            <HomeTileButton
              title="Try yourself in quizzes"
              imageSource={require("../../assets/images/img_quizzes.png")}
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
