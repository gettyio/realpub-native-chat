/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

//import RealpubNativeChat from "@realpub/native-chat";
import RealpubNativeChat from "./src/index";

export default class ReactNativeChatDemo extends Component {
  render() {
    const contactList = [
      {
        id: 6,
        firstName: "Lara",
        lastName: "Ianakiara",
        username: "lara",
        status: "Peppa!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      },
      {
        id: 2,
        firstName: "Marlon",
        lastName: "Gomes",
        username: "Marlon",
        status: "modafocaaaa!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
      },
      {
        id: 3,
        firstName: "Phillip",
        lastName: "Lopes",
        username: "Phillip",
        status: "ONLINE",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];

    const user = {
      id: 1,
      firstName: "Dio Ianakiara",
      lastName: "Ianakiara",
      username: "Dio",
      status: "Life is Good!",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
    };

    return (
      <View style={styles.container}>
        <RealpubNativeChat
          user={user}
          contacts={contactList}
          apikey="55pq4hiz4rcgf2"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

AppRegistry.registerComponent("ReactNativeChatDemo", () => ReactNativeChatDemo);
