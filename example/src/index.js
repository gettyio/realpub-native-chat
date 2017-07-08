import React from "react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import realpub from './lib/realpub';
//realpub.clearDB();

console.ignoredYellowBox = [
  "Warning: Can only update a mounted or mounting component.",
  "Warning: Cannot update during an existing state transition",
  "Warning: checkPropTypes"
];

const RealpubNativeChat = props => {
  const { contacts, user, apikey } = props;
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
