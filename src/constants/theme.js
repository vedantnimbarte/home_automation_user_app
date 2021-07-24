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
  BedRoom: require("../assets/images/bedroom.png"),
};

export const COLORS = {
  Primary: "#FFC619",
  Background: "#000000",
  White: "#ffffff",
};
