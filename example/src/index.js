import React from "react";
import { Provider } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import store from "./store";
import moment from "moment";

const RealpubNativeChat = props => {
  const port = 9080;
  const host = "localhost";
  const baseURL = `http://${host}:${port}`;
  const repSrv = `realm://${host}:${9080}/${app}/users`;
  const app = props.apikey;
  const currentUser = props.user;

  Realm.Sync.User.login(baseURL, "david@getty.io", "12345", (error, user) => {
    if (!error) {
      var realm = new Realm({
        sync: {
          user: user,
          url: repSrv
        },
        schema: [User, Message],
        schemaVersion: 14
      });

      realm.write(() => {
        store.create("User", currentUser, true);
      });
    }
  });

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
