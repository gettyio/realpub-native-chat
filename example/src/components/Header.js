import { StyleSheet } from "react-native";
import React from "react";

const Header = () =>
  <View style={styles.header}>
    <Text style={styles.title}>Realpub Contact List</Text>
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

export { Header };
