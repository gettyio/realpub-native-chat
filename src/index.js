import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ChatScreen from "./containers/ChatScreen";
import ContactListScreen from "./containers/ContactListScreen";

const RealpubNativeChat = () =>
  <NativeRouter>
    <View style={styles.container}>
      <Route exact path="/" component={ContactListScreen} />
      <Route path="/chat" component={ChatScreen} />
    </View>
  </NativeRouter>;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  }
});
export default RealpubNativeChat;
