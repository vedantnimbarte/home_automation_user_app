import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen, Home, Room } from "../screens";
import { COLORS } from "../constants/theme";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Capstone Automation",
        headerTitleAlign: "center",
        headerTintColor: COLORS.Background,
        headerStyle: {
          backgroundColor: COLORS.Primary,
        },
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: false,
        }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
