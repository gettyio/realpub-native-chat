import React from "react";
import { Provider } from "react-redux";

import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import ContactListScreen from "./containers/ContactListScreen";
import ChatScreen from "./containers/ChatScreen";

import store from "./store";
import moment from "moment";
import Realpub from "./services/realpub";

//clean contacts on up
store.write(() => {
  store.deleteAll();
});
console.ignoredYellowBox = [
  "Warning: Cannot update during an existing state transition"
];

const RealpubNativeChat = props => {
  const { contacts, user, apikey } = props;

  Realpub.init(props.apikey)
    .then(socket => {
      socket.on(`chat::send::message::to::${user.id}`, data => {
        if (data.status === "SENT") {
          data.status = "RECEIVED";
          socket.emit(`chat::send::message::to::${data.from}`, {
            ...data,
            timestamp: new Date(data.timestamp)
          });
        }

        store.write(() => {
          store.create(
            "Message",
            {
              ...data,
              timestamp: new Date(data.timestamp)
            },
            true
          );
        });
      });

      contacts.map(item => {
        Realpub.send(`send('chat::get::conversation'`, {
          apikey,
          to: user.id,
          from: item.id
        });
      });

      Realpub.on(`chat::${user.id}::got::conversation`, data => {
        console.log(data);
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
