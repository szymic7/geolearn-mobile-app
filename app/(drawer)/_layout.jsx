import { Drawer } from "expo-router/drawer";
import { Icon } from "react-native-paper";
import DrawerHeader from "../../components/ui/DrawerHeader";
import Colors from "../../utils/colors";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textPrimary,
        drawerLabelStyle: { fontSize: 16 },
        headerShown: false,
        drawerStyle: {
          width: "75%",
        },
      }}
      drawerContent={(props) => <DrawerHeader {...props} />}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Icon source="home-outline" size={size} color={color}></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="regionChoiceFlags"
        options={{
          title: "Flags",
          drawerLabel: "Flags",
          drawerIcon: ({ color, size }) => (
            <Icon source="flag-outline" size={size} color={color}></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="regionChoiceCapitals"
        options={{
          title: "Capitals",
          drawerLabel: "Capitals",
          drawerIcon: ({ color, size }) => (
            <Icon source="city" size={size} color={color}></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="quiz"
        options={{
          title: "Quiz",
          drawerLabel: "Quizzes",
          drawerIcon: ({ color, size }) => (
            <Icon source="brain" size={size} color={color}></Icon>
          ),
        }}
      />
      {/* <Drawer.Screen
        name="leaderboards"
        options={{
          title: "Leaderboards",
          drawerLabel: "Leaderboards",
          drawerIcon: ({ color, size }) => (
            <Icon source="cup" size={size} color={color}></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "About",
          drawerLabel: "About",
          drawerIcon: ({ color, size }) => (
            <Icon source="about" size={size} color={color}></Icon>
          ),
        }}
      /> */}
    </Drawer>
  );
}
