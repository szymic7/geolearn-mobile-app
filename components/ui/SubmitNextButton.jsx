import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../../utils/colors";

export default function SubmitNextButton({
  submitted = false,
  onSubmit,
  onNext,
}) {
  const handlePress = () => {
    if (!submitted && onSubmit) {
      onSubmit();
    } else if (submitted && onNext) {
      onNext();
    }
  };

  return (
    <Pressable
      style={[styles.button, submitted ? styles.submitted : null]}
      onPress={handlePress}
    >
      <Text style={[styles.text, , submitted ? styles.textSubmitted : null]}>
        {submitted ? "Next" : "Submit"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 65,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 19,
    borderColor: Colors.textPrimary,
    backgroundColor: Colors.primaryLight,
  },

  submitted: {
    backgroundColor: Colors.secondary,
  },

  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    color: Colors.background,
  },

  textSubmitted: {
    color: Colors.primaryLight,
  },
});
