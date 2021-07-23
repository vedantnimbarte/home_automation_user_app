import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const SIZES = {
  Height: height,
  Width: width,
};

export const IMAGES = {
  Logo: require("../assets/images/logo.png"),
  Plug: require("../assets/images/plug-icon.png"),
  DoorLock: require("../assets/images/door-lock-icon.png"),
};

export const COLORS = {
  Primary: "#FDCA2B",
  Background: "#444444",
  White: "#ffffff",
};
