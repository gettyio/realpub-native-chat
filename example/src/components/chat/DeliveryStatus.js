import React from "react";
// import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "native-base";

const DeliveryStatus = ({ status }) =>
  <View>
    <Text style={styles}>
      {status}
    </Text>
  </View>;

const styles = {
  fontSize: 8,
  color: "#777",
  alignSelf: "flex-end",
  right: 2
};

export default DeliveryStatus;
