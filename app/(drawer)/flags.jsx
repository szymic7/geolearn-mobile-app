import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/ui/BurgerMenuButton";
import FlagsViewer from "../../components/ui/FlagsViewer";
import { FLAGS_ENDPOINTS } from "../../constants/api";
import Colors from "../../utils/colors";

const REGION_TO_URL_MAP = {
  europe: FLAGS_ENDPOINTS.EUROPEAN_FLAGS,
  asia: FLAGS_ENDPOINTS.ASIAN_FLAGS,
  africa: FLAGS_ENDPOINTS.AFRICAN_FLAGS,
  north_america: FLAGS_ENDPOINTS.NORTH_AMERICAN_FLAGS,
  south_america: FLAGS_ENDPOINTS.SOUTH_AMERICAN_FLAGS,
  australia: FLAGS_ENDPOINTS.AUSTRALIAN_FLAGS,
  world: FLAGS_ENDPOINTS.ALL_FLAGS,
};

export default function Flags() {
  const { region } = useLocalSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCountries = async () => {
        try {
          const url = REGION_TO_URL_MAP[region] || FLAGS_ENDPOINTS.ALL_FLAGS;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const sortedData = [...data].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          if (isActive) {
            setCountries(sortedData);
          }
        } catch (error) {
          console.error("Failed to fetch countries:", error);
          Alert.alert("Error", "Failed to load flags. Please try again later.");
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchCountries();

      return () => {
        isActive = false;
      };
    }, [region])
  );

  return (
    <ScreenLayout style={{ backgroundColor: Colors.primaryLight }}>
      {!loading ? (
        <View style={styles.container}>
          <View style={styles.burgerArea}>
            <BurgerMenuButton />
          </View>

          <View style={styles.flagsViewer}>
            <FlagsViewer countries={countries} />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.primaryDark} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
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

  flagsViewer: {
    marginTop: 120,
    height: "60%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 20,
    color: Colors.secondary,
    fontSize: 16,
  },
});
