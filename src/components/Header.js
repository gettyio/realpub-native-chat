import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Link } from "react-router-native";

const LeftBtn = ({ enableLeftBtn }) => {
  if (!enableLeftBtn) return null;
  return (
    <Link
      to={"/"}
      component={TouchableOpacity}
      style={{
        position: "absolute",
        left: 0,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16
      }}
    >
      <Text style={{ color: "white", fontWeight: "700" }}>Back</Text>
    </Link>
  );
};

const RightBtn = () =>
  <TouchableOpacity
    onPress={() => {}}
    style={{
      position: "absolute",
      rigth: 0,
      paddingLeft: 8,
      paddingTop: 16
    }}
  >
    <Text style={{ color: "white", fontWeight: "700" }}>Back</Text>
  </TouchableOpacity>;

const Header = ({ barStyle, enableLeftBtn, user }) =>
  <View style={styles.header}>
    <StatusBar barStyle={`${barStyle || "light-content"}`} />
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.title}>{user.fullName}</Text>
      </View>

      <LeftBtn enableLeftBtn={enableLeftBtn} />
    </View>
  </View>;

const styles = StyleSheet.create({
  header: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    paddingTop: 16
  }
});

export default Header;
