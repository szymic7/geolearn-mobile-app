import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { useAuth } from "../../contexts/authContext";
import Colors from "../../utils/colors";

export default function DrawerHeader(props) {
  const { user } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon source="account" size={32} color={Colors.textPrimary}></Icon>
        </View>
        <View style={styles.column}>
          <Text style={styles.name}>{user?.username || "Guest"}</Text>
          <Text style={styles.email}>{user?.email || "guest@example.com"}</Text>
        </View>
      </View>

      {/* 🔹 Lista ekranów (Home, Flags, Quiz) */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 8,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: Colors.textLight,
    fontSize: 12,
  },
  icon: {
    alignSelf: "center",
  },
});
