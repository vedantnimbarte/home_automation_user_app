import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { IMAGES, SIZES } from "../constants/theme";

export default function SplashScreen() {
  return (
    <View style={styles.MainContainer}>
      <Image source={IMAGES.Logo} style={styles.Logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Logo: {
    height: SIZES.Height * 0.26,
    width: SIZES.Width * 0.5,
  },
});
