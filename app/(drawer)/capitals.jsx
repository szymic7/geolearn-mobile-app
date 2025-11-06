import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import CapitalsViewer from "../../components/CapitalsViewer";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/navigation/BurgerMenuButton";
import { CAPITALS_ENDPOINTS } from "../../constants/api";
import Colors from "../../utils/colors";

const REGION_TO_URL_MAP = {
  europe: CAPITALS_ENDPOINTS.EUROPEAN_CAPITALS,
  asia: CAPITALS_ENDPOINTS.ASIAN_CAPITALS,
  africa: CAPITALS_ENDPOINTS.AFRICAN_CAPITALS,
  north_america: CAPITALS_ENDPOINTS.NORTH_AMERICAN_CAPITALS,
  south_america: CAPITALS_ENDPOINTS.SOUTH_AMERICAN_CAPITALS,
  australia: CAPITALS_ENDPOINTS.AUSTRALIAN_CAPITALS,
  world: CAPITALS_ENDPOINTS.ALL_CAPITALS,
};

export default function Capitals() {
  const { region } = useLocalSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchCountries = async () => {
        try {
          setLoading(true);
          setCountries([]);

          const url =
            REGION_TO_URL_MAP[region] || CAPITALS_ENDPOINTS.ALL_CAPITALS;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const sortedData = [...data].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setCountries(sortedData);
        } catch (error) {
          console.error("Failed to fetch countries:", error);
          Alert.alert("Error", "Failed to load data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();
    }, [region])
  );

  return (
    <ScreenLayout style={{ backgroundColor: Colors.primaryLight }}>
      {!loading ? (
        <View style={styles.container}>
          <View style={styles.burgerArea}>
            <BurgerMenuButton />
          </View>

          <View style={styles.capitalsViewer}>
            <CapitalsViewer countries={countries} />
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

  capitalsViewer: {
    marginTop: 100, // starts below BurgerMenuButton
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
