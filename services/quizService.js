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