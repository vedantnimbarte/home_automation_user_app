import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "../screens";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
