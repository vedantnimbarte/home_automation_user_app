import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { COLORS, IMAGES, SIZES } from "../constants/theme";
import { CONFIG } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const _loginHandler = async () => {
    const url = `http://${CONFIG.IP}:${CONFIG.PORT}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).catch((error) =>
      ToastAndroid.show(
        "unable to get data. Please check your device is connected to internet.",
        ToastAndroid.LONG
      )
    );
    const result = await response.json();

    if (result.success === 1) {
      await AsyncStorage.setItem("userDetails", JSON.stringify(result));
      _navigationHandler("Home");
    } else {
      Alert.alert(
        result.message,
        "Check your email address and password again."
      );
    }
  };
  const _navigationHandler = (screen_name) => {
    navigation.navigate(screen_name);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.Background }}
    >
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <View style={styles.MainContainer}>
          <View style={styles.LogoContainer}>
            <Image source={IMAGES.Logo} style={styles.Logo} />
            <Text style={styles.HeaderTitle}>Capstone Automation</Text>
            <Text style={styles.HeaderText}>Login to your account</Text>
          </View>
          <View style={styles.FormContainer}>
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor={COLORS.White}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.FormInput}
            />
            <TextInput
              keyboardType="default"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={COLORS.White}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.FormInput}
            />
            <TouchableOpacity style={styles.LoginBtn} onPress={_loginHandler}>
              <Text style={styles.LoginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.Background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  LogoContainer: {
    padding: 10,
    alignItems: "center",
    marginTop: SIZES.Height * 0.1,
  },
  Logo: {
    height: SIZES.Height * 0.15,
    width: SIZES.Width * 0.28,
    margin: 10,
  },
  HeaderTitle: {
    color: COLORS.Primary,
    fontSize: 30,
    margin: 10,
  },
  HeaderText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: 20,
    margin: 30,
    opacity: 0.8,
  },
  FormContainer: {
    margin: 10,
    marginTop: SIZES.Height / 20,
    width: SIZES.Width * 0.8,
  },
  FormInput: {
    borderRadius: 10,
    padding: 15,
    paddingLeft: 20,
    color: COLORS.White,
    backgroundColor: "gray",
    opacity: 0.7,
    margin: 10,
  },
  LoginBtn: {
    backgroundColor: COLORS.Primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
  },
  LoginText: {
    color: COLORS.White,
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 16,
  },
});
