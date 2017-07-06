import React from "react";
import { Provider } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import store from "./store";
import moment from "moment";
import Realpub from "./services/realpub";

const RealpubNativeChat = props => {
  Realpub.init(props.apikey)
    .then(socket => {
      socket.on(`chat::send::message::to::${props.user.id}`, data => {
        store.write(() => {
          store.create(
            "Message",
            {
              ...data,
              status: "RECEIVED",
              timestamp: new Date(data.timestamp)
            },
            true
          );
        });

        socket.emit(`chat::send::message::to::${data.from}`, {
          ...data,
          status: "RECEIVED",
          timestamp: new Date(data.timestamp)
        });
      });
    })
    .catch(err => console.error(err));
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
