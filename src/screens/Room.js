import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Switch,
  TouchableOpacity,
} from "react-native";
import { COLORS, IMAGES, SIZES } from "../constants/theme";
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import { CONFIG } from "../constants/config";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default function Room({ navigation, route }) {
  const [status, setStatus] = React.useState(false);
  const [Appliances, setAppliances] = React.useState();

  React.useEffect(() => {
    getRoomInfo();
  }, []);

  const getRoomInfo = async () => {
    const response = await fetch(
      `http://${CONFIG.IP}:${CONFIG.PORT}/config/getRoomInfo?user_id=1234&room_name='${route.params.roomInfo.room}'`
    );
    const result = await response.json();
    setAppliances(result.results);
  };

  const updateApplianceStatus = async (data) => {
    let message = "0";
    if (data.relay_status === 0) {
      message = "1";
    }
    const response = await fetch(
      `http://${CONFIG.IP}:${CONFIG.PORT}/device/${data.serial_no}/${data.relay}/${message}/${data.id}`
    );
    const result = await response.json();
    getRoomInfo();
  };

  const _toggleSwitch = () => {
    setStatus((previousState) => !previousState);
  };

  const _renderAppliances = ({ item }) => {
    return (
      <View
        style={{
          ...(item.status
            ? { backgroundColor: COLORS.White }
            : { backgroundColor: "gray" }),
          borderRadius: 20,
          margin: 10,
          width: SIZES.Width * 0.35,
          alignItems: "center",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name={item.icon} size={30} color={COLORS.Primary} />
          <Text
            style={{
              ...(item.status
                ? { color: COLORS.Background }
                : { color: COLORS.White }),
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: 15,
              margin: 10,
            }}
          >
            {item.appliance}
            {Boolean(item.relay_status)}
          </Text>
        </View>
        <Switch
          trackColor={{ false: COLORS.Background, true: COLORS.Primary }}
          thumbColor={COLORS.White}
          value={Boolean(item.relay_status)}
          onValueChange={() => updateApplianceStatus(item)}
          style={styles.ApplianceSwitch}
        />
      </View>
    );
  };
  return (
    <View>
      <Image source={IMAGES.BedRoom} style={styles.Background} />
      <View style={styles.Header}>
        <TouchableOpacity>
          <Entypo name="menu" size={30} color={COLORS.White} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={COLORS.White} />
        </TouchableOpacity>
      </View>
      <View style={styles.RoomNameContainer}>
        <Text style={styles.RoomName}>{route.params.roomInfo.room}</Text>
        <View style={styles.RoomNameUnderLine} />
      </View>
      <View style={styles.AppliancesContainer}>
        <FlatList
          data={Appliances}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={_renderAppliances}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  Background: {
    height: SIZES.Height * 1.1,
    width: SIZES.Width * 1,
  },
  Header: {
    position: "absolute",
    marginTop: SIZES.Height * 0.1,
    flexDirection: "row",
    margin: 30,
    width: SIZES.Width * 0.8,
    justifyContent: "space-between",
  },
  RoomNameContainer: {
    position: "absolute",
    marginTop: SIZES.Height * 0.25,
    marginLeft: SIZES.Width * 0.1,
    margin: 10,
  },
  RoomName: {
    color: COLORS.White,
    fontSize: 25,
  },
  RoomNameUnderLine: {
    borderWidth: 2,
    borderColor: COLORS.Primary,
    borderRadius: SIZES.Height * 1,
    width: SIZES.Width * 0.2,
  },
  AppliancesContainer: {
    position: "absolute",
    marginTop: SIZES.Height * 0.8,
    margin: 20,
    width: SIZES.Width * 0.9,
    height: SIZES.Height * 0.2,
  },
  ApplianceContainer: {
    backgroundColor: COLORS.White,
    borderRadius: 20,
    margin: 10,
    width: SIZES.Width * 0.3,
    alignItems: "center",
    padding: 20,
  },
  ApplianceSwitch: {
    transform: [{ scale: 1.3 }],
    margin: 20,
    // marginTop: SIZES.Height / 30,
  },
});
