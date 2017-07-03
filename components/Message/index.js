import React from "react";
import { Text } from "native-base";
import { View, StyleSheet, Dimensions } from "react-native";

const Message = ({ message, user }) => {
  const userAuthor = user.id === message.from ? true : false;

  if (userAuthor) {
    return (
      <View sytle={{}}>
        <View
          style={{
            padding: 15,
            backgroundColor: "white"
          }}
        >
          <View
            style={{
              flex: 0,
              marginLeft: 30,
              padding: 15,
              backgroundColor: "#f1f0f0",
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "200",
                fontSize: 12
              }}
            >
              {message.message}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#333",
            backgroundColor: "#f1f0f0",
            fontSize: 7,
            textAlignVertical: "center",
            position: "absolute",
            right: 20,
            bottom: 20
          }}
        >
          {` ${message.status}`}
        </Text>
      </View>
    );
  }

  return (
    <View sytle={{}}>
      <View
        style={{
          padding: 15,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            marginRight: 30,
            padding: 15,
            backgroundColor: "#4080ff",
            borderRadius: 5
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "200",
              fontSize: 12
            }}
          >
            {message.message}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#4080ff"
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 7,
            textAlignVertical: "center",
            position: "absolute",
            right: 50,
            bottom: 20
          }}
        >
          {` ${message.status}`}
        </Text>
      </View>
    </View>
  );
};

export { Message };
