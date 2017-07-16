import React from "react";
// import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "native-base";

const newStatus = () =>
  <View style={[blockStyle, { right: 1 }]}>
    <View style={grayStyle}>
    </View>
  </View>;

const sentStatus = () =>
  <View style={blockStyle}>
    <View style={grayStyle}>
    </View>
    <View style={grayStyle}>
    </View>    
  </View>;

const receivedStatus = () =>
  <View style={blockStyle}>
    <View style={blueStyle}>
    </View>
    <View style={grayStyle}>
    </View>    
  </View>;  

const readStatus = () =>
  <View style={blockStyle}>
    <View style={blueStyle}>
    </View>
    <View style={blueStyle}>
    </View>    
  </View>;    
  

const DeliveryStatus = ({ status }) => {

  let statusView;
  switch (status) {
    case 'NEW':
      statusView = newStatus();
      break;
    case 'SENT':
      statusView = sentStatus();
      break;
    case 'RECEIVED':
      statusView = receivedStatus();
      break;
    case 'READ':
      statusView = readStatus();
      break;            
    default:
      statusView = newStatus();
      break;
  }
  return statusView;
}


const blockStyle = {
  width: 12, 
  height: 4,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
  right: 1
};

const grayStyle = { height: 4, width: 4, borderRadius: 2, marginLeft: 1, alignSelf: "flex-end", backgroundColor: '#808080' };
const blueStyle = { height: 4, width: 4, borderRadius: 2, marginLeft: 1, alignSelf: "flex-end", backgroundColor: '#398fdd' };

export default DeliveryStatus;
