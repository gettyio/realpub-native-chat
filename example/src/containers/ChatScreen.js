import React, { Component } from "react";
import { View } from "react-native";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.state.user);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      />
    );
  }
}

export default ChatScreen;
