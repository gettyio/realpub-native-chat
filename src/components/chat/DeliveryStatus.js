import React from 'react';
// import PropTypes from "prop-types";
import { View } from 'react-native';
import { Text } from 'native-base';

const DeliveryStatus = () => (
  <View>
    <Text style={styles}>Read / Delivered</Text>
  </View>
);

const styles = {
  fontSize: 10,
  color: '#777',
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: -12,
  right: 2
};

export default DeliveryStatus;
