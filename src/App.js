import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
