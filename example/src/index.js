import React from "react";
import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import Realpub from './lib/realpub';

console.ignoredYellowBox = [
  "Warning: Can only update a mounted or mounting component.",
  "Warning: Cannot update during an existing state transition",
  "Warning: checkPropTypes"
];

const RealpubNativeChat = props => {
  const { contacts, user, apikey } = props;
  const realpub = Realpub(user._id);
  //realpub.clearDB();
  return (
    <NativeRouter>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <Route exact path="/" render={() => <ContactListScreen {...props} realpub={realpub} />} />
        <Route path="/chat" render={propz => <ChatScreen {...propz} realpub={realpub} />}  />
      </View>
    </NativeRouter>
  );
};

export default RealpubNativeChat;
