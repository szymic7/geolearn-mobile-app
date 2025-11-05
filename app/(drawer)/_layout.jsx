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
        name="flagsRegionChoice"
        options={{
          title: "Flags",
          drawerLabel: "Flags",
          drawerIcon: ({ color, size }) => (
            <Icon source="flag-outline" size={size} color={color}></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="capitalsRegionChoice"
        options={{
          title: "Capitals",
          drawerLabel: "Capitals",
          drawerIcon: ({ color, size }) => (
            <Icon source="city" size={size} color={color}></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="quizCategoryChoice"
        options={{
          title: "Quiz",
          drawerLabel: "Quizzes",
          drawerIcon: ({ color, size }) => (
            <Icon source="brain" size={size} color={color}></Icon>
          ),
        }}
      />
    </Drawer>
  );
}
