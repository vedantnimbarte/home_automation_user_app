import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export default function Home() {
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const Rooms = [
    { id: 1, room: "Master Bedroom" },
    { id: 2, room: "Bedroom" },
    { id: 3, room: "Kids Room" },
    { id: 4, room: "Drawing Room" },
  ];

  const _renderRooms = ({ item }) => {
    return (
      <TouchableOpacity style={styles.RoomContainer}>
        <Text style={styles.RoomTitle}>{item.room}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.MainContainer}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.AnalyticsCard}>
          <Text style={styles.ContainerTitle}>House Name</Text>
          <View style={styles.MainHouseInfoContainer}>
            <View style={styles.HouseInfoCard}>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>22 °C</Text>
                <Text style={styles.UnitTitle}>Avg House Temp</Text>
              </View>
              <View style={styles.UnitContainer}>
                <Text style={styles.UnitsText}>22 °C</Text>
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
            <FlatList
              numColumns={2}
              data={Rooms}
              keyExtractor={(item) => item.id}
              renderItem={_renderRooms}
            />
          </View>
        </View>
        <View style={styles.AnalyticsCard}>
          <Text style={styles.ContainerTitle}>Door Lock</Text>
          <View style={styles.MainHouseInfoContainer}>
            <Text>Door Lock</Text>
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
    borderRadius: 10,
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
    margin: 10,
  },
  RoomsContainer: {
    justifyContent: "space-between",
    // alignItems: "center",
  },
  RoomContainer: {
    backgroundColor: COLORS.Primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.Height / 10,
    width: SIZES.Width * 0.4,
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  RoomTitle: {
    color: COLORS.Background,
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
});
