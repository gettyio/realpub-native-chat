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
    /**
     * {
        _id: "2",
        fullName: "Lara",
        displayName: "dio",
        status: "Life is Good!",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
      };
     */
    renderContactsRow = ({ _id, avatar, displayName, fullName, toRead })=> {
      return (
        <View style={{padding: 16, borderWidth: 1, borderColor: 'gray'}}>
          <View>
            <Text>
              {avatar}
            </Text>
          </View>
          <View>
           <Text>
              {displayName} - {toRead}
            </Text>         
          </View>
        </View>
      )
    }

    renderHeader = (user) => {
      return (
        <View style={{padding: 16, borderWidth: 1, borderColor: 'red', alignItems: "center"}}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {user.displayName}
          </Text>
        </View>
      );
    }

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
      _id: "1",
      fullName: "Dio",
      displayName: "dio",
      status: "Life is Good!",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
    };

    const userBg = require("./src/assets/img/ubg.png");
    return (
      <View style={styles.container}>
        <RealpubNativeChat
          user={user}
          contacts={contactList}
          apikey="55pq4hiz4rcgf2"
          // hideChatHeader={false}          
          // renderChatHeader={renderHeader}
          chatBgImg={userBg}

          // hideContactsHeader={false}          
          // renderContactsHeader={renderHeader}
          // renderContactsRow={renderContactsRow}
          screen={'chat'}
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
