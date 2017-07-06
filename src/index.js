import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

const RealpubNativeChat = props => {
  return (
    <NativeRouter>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <Route
          exact
          path="/"
          render={() => <ContactListScreen {...props} apiKey={props.apiKey} />}
        />
        <Route path="/chat" render={propz => <ChatScreen {...propz} />} />
      </View>
    </NativeRouter>
  );
};

export default RealpubNativeChat;
