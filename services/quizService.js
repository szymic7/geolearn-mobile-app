import * as SecureStore from "expo-secure-store";
import { QUIZ_ENDPOINTS } from "../constants/api";
import TRIVIA_API_BASE from "../constants/trivia-api";

const difficulties = ["easy", "medium", "hard"];

const LIMITS_MAP = {
  flags: [10, 10, 10],
  capitals: [10, 10, 10],
  europe: [3, 4, 3],
  asia: [3, 4, 3],
  africa: [3, 4, 3],
  north_america: [1, 1, 8],
  south_america: [2, 4, 4],
  australia: [3, 4, 3],
  world: [3, 4, 3],
};

/**
 * Fetches logged in user's best scores in each quiz category.
 * Requires a valid auth token stored in SecureStore.
 * @returns {Promise<Object>} A map of categories -> best score
 */
export async function fetchUserBestScores() {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      console.warn("⚠️ No auth token found — user may not be logged in.");
      return {};
    }

    const res = await fetch(QUIZ_ENDPOINTS.MY_BEST, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn(`⚠️ Request failed: ${res.status}`);
      return {};
    }

    const json = await res.json();

    const results = {};

    // Flags (world only)
    const flagsWorld = json.flags?.find((item) => item.subcategory === "world");
    results.flags = flagsWorld ? flagsWorld.score : 0;

    // Capitals (world only)
    const capitalsWorld = json.capitals?.find((item) => item.subcategory === "world");
    results.capitals = capitalsWorld ? capitalsWorld.score : 0;

    // Mixed (all subcategories)
    results.mixed = (json.mixed || []).reduce((acc, item) => {
      acc[item.subcategory] = item.score;
      return acc;
    }, {});

    return results;
  } catch (error) {
    console.error("❌ Error retrieving user best scores:", error);
    return {};
  }
}

/**
 * Fetches quiz questions of all difficulty levels, formats, and merges them.
 * @returns {Promise<Array>} Formatted questions ready for use in Quiz component.
 */
export async function fetchAllQuestions(category) {
    const tagMap = {
        capitals: "capital_cities",
        north_america: "central_america",
    };
    const tag = tagMap[category] || category;

    const limits = LIMITS_MAP[category] || [3, 4, 3];

  try {
    const requests = difficulties.map((difficulty, index) => {
        const tagParam = category === "world" ? "" : `&tags=${tag}`;
        const url = `${TRIVIA_API_BASE}${tagParam}&limit=${limits[index]}&difficulty=${difficulty}`;

        return fetch(url).then((res) => res.json());
    });

    const results = await Promise.all(requests);
    const merged = results.flat();

    // Format questions
    const formatted = merged.map((item) => {
      const allAnswers = [...item.incorrectAnswers, item.correctAnswer];

      // Shuffle answers
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }

      return {
        id: item.id,
        question: typeof item.question === "string" ? item.question : item.question.text,
        answers: allAnswers,
        correctAnswerIndex: allAnswers.indexOf(item.correctAnswer),
      };
    });

    return formatted;
  } catch (error) {
    console.error("❌ Error fetching quiz data:", error);
    throw error;
  }
}