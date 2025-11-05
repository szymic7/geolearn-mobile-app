import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useAuth } from "../../contexts/authContext";
import Colors from "../../utils/colors";

export default function LogoutButton() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login"); // przekierowanie po wylogowaniu
  }

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Icon source="logout" size={22} color={Colors.error} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  logoutText: {
    color: Colors.error,
    fontSize: 16,
    marginLeft: 10,
  },
});
