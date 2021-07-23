import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const SIZES = {
  Height: height,
  Width: width,
};

export const IMAGES = {
  Logo: require("../assets/images/logo.png"),
};
