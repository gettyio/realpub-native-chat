import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ChatScreen from "./containers/ChatScreen";
import ContactListScreen from "./containers/ContactListScreen";

const RealpubNativeChat = () =>
  <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>ChatScreen</Text>
        </Link>
        <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>ContactListScreen</Text>
        </Link>
      </View>

      <Route exact path="/" component={ContactListScreen} />
      <Route path="/chat" component={ChatScreen} />
    </View>
  </NativeRouter>;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  }
});
export default RealpubNativeChat;
