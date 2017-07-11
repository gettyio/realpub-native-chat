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
        _id: "2",
        fullName: "Lara Ianakiara",
        displayName: "larinha",
        status: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      },
      {
        _id: "58e67bc617ae630010c530c1addass",
        fullName: "Marlon Gomes",
        displayName: "mister-m",
        status: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
      },
      {
        _id: "1",
        fullName: "Dio",
        displayName: "diob1",
        status: "Life is Good!",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];

    const user = {
      _id: "2",
      fullName: "Lara",
      displayName: "dio",
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
