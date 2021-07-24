import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, IMAGES, SIZES } from "../constants/theme";

export default function SplashScreen({ navigation }) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2000);
  });

  return (
    <View style={styles.MainContainer}>
      <Image source={IMAGES.Logo} style={styles.Logo} />
      <View style={styles.AppNameContainer}>
        <Text style={styles.AppName}>Capstone Automation</Text>
        <Text style={styles.AppDescription}>
          Something revolutionary for your home
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  Logo: {
    height: SIZES.Height * 0.26,
    width: SIZES.Width * 0.5,
    marginTop: SIZES.Height * 0.3,
  },
  AppNameContainer: {
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  AppName: {
    fontSize: 30,
    color: COLORS.Primary,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  AppDescription: {
    fontSize: 12,
    color: COLORS.White,
    letterSpacing: 1,
  },
});
