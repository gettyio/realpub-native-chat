import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ChatScreen from "./containers/ChatScreen";
import ContactListScreen from "./containers/ContactListScreen";

const RealpubNativeChat = props => {
  return (
    <NativeRouter>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <Route exact path="/" render={() => <ContactListScreen {...props} />} />
        <Route path="/chat" render={propz => <ChatScreen {...propz} />} />
      </View>
    </NativeRouter>
  );
};

export default RealpubNativeChat;
