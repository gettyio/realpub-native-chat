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
        id: "58e67bc617ae630010c530c1",
        fullName: "Lara Ianakiara",
        displayName: "larinha",
        status: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      },
      {
        id: "58e67bc617ae630010c530c1addass",
        fullName: "Marlon Gomes",
        displayName: "mister-m",
        status: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
      },
      {
        id: "adsassda58e67bc617ae630010c530c1",
        fullName: "Phillip Lopes",
        displayName: "paflops",
        status: "Life is Good!",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];

    const user = {
      id: "lllll58e67bc617ae630010c530c1",
      fullName: "Dio Ianakiara",
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
