import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import store from "./store";
import moment from "moment";

//clean contacts on up
store.write(() => {
  store.deleteAll();
});
console.ignoredYellowBox = [
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
