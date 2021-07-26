import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen, Home, Room, Login } from "../screens";
import { COLORS } from "../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Navigation() {
  const _logout = async () => {
    await AsyncStorage.removeItem("userDetails");
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Capstone Automation",
        headerTitleAlign: "center",
        headerTintColor: COLORS.Background,
        headerStyle: {
          backgroundColor: COLORS.Primary,
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => _logout()}>
            <MaterialIcons
              name="logout"
              size={25}
              color="red"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: false,
        }}
      />
      <Stack.Screen
        name="Room"
        component={Room}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
