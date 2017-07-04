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
        key: 1,
        fullname: "Dio Ianakiara",
        username: "Dio",
        userStatus: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
      },
      {
        key: 2,
        fullname: "Marlon Gomes",
        username: "Marlon",
        userStatus: "modafocaaaa!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"
      },
      {
        key: 3,
        fullname: "Phillip Lopes",
        username: "Phillip",
        userStatus: "DevOps Ok!",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
      }
    ];
    return (
      <View style={styles.container}>
        <RealpubNativeChat contactList={contactList} />
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
