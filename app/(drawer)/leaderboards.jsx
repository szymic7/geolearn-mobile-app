import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ScreenLayout from "../../components/layout/ScreenLayout";
import BurgerMenuButton from "../../components/navigation/BurgerMenuButton";
import ThemedText from "../../components/ui/ThemedText";
import Colors from "../../utils/colors";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Leaderboards() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("flags"); // flags / capitals / mixed

  const headerTitle =
    activeCategory.charAt(0).toUpperCase() +
    activeCategory.slice(1) +
    " Leaderboard";

  useFocusEffect(
    useCallback(() => {
      async function fetchScores() {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`${API_BASE_URL}/quiz/leaderboards`);
          if (!res.ok)
            throw new Error("Something went wrong with fetching data");

          const data = await res.json();
          setScores(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchScores();
    }, [])
  );

  return (
    <ScreenLayout style={{ backgroundColor: Colors.primaryLight }}>
      <View style={styles.container}>
        <View style={styles.burgerArea}>
          <BurgerMenuButton />
        </View>
        <View style={styles.mainContent}>
          <View style={styles.actions}>
            {["flags", "capitals", "mixed"].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.button,
                  activeCategory === category && styles.buttonActive,
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[
                    styles.text,
                    activeCategory === category && styles.textActive,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.leaderboard}>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <ThemedText
              color={Colors.textInverse}
              style={{ textAlign: "center", marginBottom: 12 }}
              size={20}
            >
              {headerTitle}
            </ThemedText>
            <FlatList
              data={scores[activeCategory] || []}
              renderItem={({ item, index }) => (
                <Item
                  name={item.username}
                  number={index + 1}
                  points={item.total_score}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              ListEmptyComponent={
                loading ? (
                  <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                  <ThemedText
                    size={20}
                    color={Colors.textLight}
                    style={styles.emptyText}
                  >
                    No scores yet
                  </ThemedText>
                )
              }
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}

const Item = ({ name, number, points }) => (
  <View style={styles.item}>
    <ThemedText size={18}>{`${number}. ${name}`}</ThemedText>
    <ThemedText size={18}>{`${points} pts`}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  burgerArea: {
    position: "absolute",
    top: 5,
    left: 13.5,
    zIndex: 10,
  },

  mainContent: {
    // flex: 1,
    width: "80%",
    height: "90%",
    marginVertical: "5%",
    backgroundColor: Colors.backgroundDark,
    borderRadius: 11,
    padding: 12,
    justifyContent: "flex-start",
  },

  actions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center`",
    alignItems: "center",
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },

  button: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },

  buttonActive: {
    backgroundColor: "#fff",
  },

  text: {
    color: Colors.textInverse,
  },

  textActive: {
    color: Colors.textPrimary,
  },

  leaderboard: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },

  leaderboardHeader: {
    color: Colors.textInverse,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
  },

  item: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginVertical: 6,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});
