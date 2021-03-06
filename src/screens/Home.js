import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  LogBox,
  Image,
  Switch,
} from "react-native";
import { COLORS, IMAGES, SIZES } from "../constants/theme";
import { CONFIG } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [doorLockStatus, setDoorLockStatus] = React.useState(false);
  const [rooms, setRooms] = React.useState();
  const [notifications, setNotifications] = React.useState();

  React.useEffect(() => {
    _validate();
    setNotifications(Notifications);
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getRooms();
    setInterval(() => {
      _validate();
      getRooms();
    }, 5000);
  }, []);

  const _validate = async () => {
    const userData = await AsyncStorage.getItem("userDetails");
    if (!userData) {
      navigation.navigate("Login");
    }
  };
  const getRooms = async () => {
    const userData = await AsyncStorage.getItem("userDetails");
    let user = JSON.parse(userData).results[0].user_id;

    const response = await fetch(
      `http://${CONFIG.IP}:${CONFIG.PORT}/config/getRoomsAssignedToUser?user_id=${user}`
    );
    const result = await response.json();
    setRooms(result.results);
  };

  const Notifications = [
    { id: 1, notificationTitle: "Power Off", message: 3 },
    { id: 2, notificationTitle: "Power Off", message: 4 },
    { id: 3, notificationTitle: "Power Off", message: 2 },
  ];

  const _toggleDoorLockwitch = () => {
    setDoorLockStatus((previousState) => !previousState);
  };

  const _renderRooms = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.RoomContainer}
        onPress={() => _navigationHandler(item)}
      >
        <Text style={styles.RoomTitle}>{item.room}</Text>
      </TouchableOpacity>
    );
  };

  const _navigationHandler = (data) => {
    navigation.navigate("Room", { roomInfo: data });
  };

  const _renderNotifications = ({ item }) => {
    return (
      <View style={styles.NotificationContainer}>
        <View style={styles.NotificationLeftContainer}>
          <Image source={IMAGES.Plug} />
          <Text style={styles.NotificationTitle}>{item.notificationTitle}</Text>
        </View>
        <View style={styles.NotificationRightContainer}>
          <Text style={styles.NotificationMessage}>{item.message}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.MainContainer}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.AnalyticsCard}>
          <Text style={styles.ContainerTitle}>House Name</Text>
          <View style={styles.MainHouseInfoContainer}>
            <View style={styles.HouseInfoCard}>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>22 ??C</Text>
                <Text style={styles.UnitTitle}>Avg House Temp</Text>
              </View>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>22 ??C</Text>
                <Text style={styles.UnitTitle}>Outside Temp</Text>
              </View>
            </View>
            <View style={styles.HouseInfoCard}>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>16%</Text>
                <Text style={styles.UnitTitle}>Avg House Temp</Text>
              </View>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>3</Text>
                <Text style={styles.UnitTitle}>Active Devices</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.RoomsCardContainer}>
          <Text style={styles.ContainerTitle}>Rooms</Text>
          <View style={styles.RoomsContainer}>
            {!rooms ? (
              <Text style={{ color: COLORS.Primary }}>No rooms available</Text>
            ) : (
              <FlatList
                numColumns={2}
                data={rooms}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={_renderRooms}
              />
            )}
          </View>
        </View>
        <View style={styles.DoorLockCard}>
          <Text style={styles.ContainerTitle}>Door Lock</Text>
          <View style={styles.DoorLockItemsContainer}>
            <View style={styles.DoorLeftCard}>
              <View style={styles.DoorLockIconOuterContainer}>
                <View style={styles.DoorLockIconInnerContainer}>
                  <Image source={IMAGES.DoorLock} />
                  <Text style={styles.DoorLockStatusText}>
                    {doorLockStatus ? "Unlocked" : "Locked"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.DoorRightCard}>
              <View style={styles.DoorLockSwitchContainer}>
                <Switch
                  trackColor={{ false: COLORS.White, true: COLORS.Background }}
                  thumbColor={doorLockStatus ? COLORS.White : COLORS.Background}
                  value={doorLockStatus}
                  onValueChange={_toggleDoorLockwitch}
                  style={styles.DoorLockSwitch}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.NotificationCard}>
          <Text style={styles.ContainerTitle}>Notification</Text>
          <View style={styles.NotificationCardContainer}>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              inverted={true}
              renderItem={_renderNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.Background,
  },
  AnalyticsCard: {
    marginTop: SIZES.Height / 100,
  },
  MainHouseInfoContainer: {
    backgroundColor: COLORS.Primary,
    padding: 10,
    width: SIZES.Width * 0.9,
    height: SIZES.Height * 0.3,
    borderRadius: 20,
    alignSelf: "center",
  },
  HouseInfoCard: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 25,
    alignItems: "center",
  },
  ContainerTitle: {
    margin: 10,
    color: COLORS.Primary,
    fontSize: 17,
    letterSpacing: 1,
  },
  UnitContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  UnitsText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  UnitTitle: {
    fontWeight: "bold",
    margin: 5,
    letterSpacing: 0.5,
  },
  RoomsCardContainer: {
    // padding: 10,
  },
  RoomsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  RoomContainer: {
    backgroundColor: COLORS.Primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.Height / 10,
    width: SIZES.Width * 0.41,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  RoomTitle: {
    color: COLORS.Background,
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  DoorLockItemsContainer: {
    backgroundColor: COLORS.White,
    borderRadius: 10,
    height: SIZES.Height * 0.2,
    alignItems: "center",
    flexDirection: "row",
  },
  DoorLeftCard: {
    backgroundColor: COLORS.White,
    height: SIZES.Height * 0.2,
    width: SIZES.Width * 0.45,
    borderBottomRightRadius: SIZES.Width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  DoorRightCard: {
    backgroundColor: COLORS.Primary,
    height: SIZES.Height * 0.2,
    width: SIZES.Width * 0.46,
    borderTopLeftRadius: SIZES.Width * 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  DoorLockIconInnerContainer: {
    backgroundColor: COLORS.Background,
    borderRadius: SIZES.Height * 12,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.Width * 0.25,
    height: SIZES.Height * 0.13,
    padding: 10,
  },
  DoorLockStatusText: {
    color: COLORS.White,
    fontWeight: "bold",
    margin: 5,
  },
  DoorLockIconOuterContainer: {
    backgroundColor: COLORS.Primary,
    borderRadius: SIZES.Height * 12,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.Width * 0.3,
    height: SIZES.Height * 0.15,
    padding: 10,
  },
  DoorLockSwitch: {
    transform: [{ scale: 1.2 }],
  },
  NotificationCardContainer: {
    backgroundColor: COLORS.Primary,
    borderRadius: 10,
    width: SIZES.Width * 0.9,
    height: SIZES.Height * 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
  NotificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 40,
    alignItems: "center",
    width: SIZES.Width * 0.9,
  },
  NotificationLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  NotificationTitle: {
    fontSize: 20,
    marginLeft: 10,
  },
  NotificationMessage: {
    fontSize: 40,
  },
});
