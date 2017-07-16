import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import DeliveryStatus from "./DeliveryStatus";

const renderStatus = (withStatus, status) => {
  return withStatus && <DeliveryStatus status={status} />;
  //return <DeliveryStatus status={status} />;
};

const MessageBlock = ({ children, withStatus, status }) => {

  let customStyle = {};
  if (!withStatus) {
    customStyle = {
      flex: 1, 
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start'
    }
  }

  return (
      <View style={styles}>
        <View style={customStyle}>
          {children}
          {renderStatus(withStatus, status)}
        </View>
      </View>
  )
}


MessageBlock.propTypes = {
  children: PropTypes.node.isRequired,
  withStatus: PropTypes.bool
};

MessageBlock.defaultProps = {
  withStatus: false
};

const styles = {
  marginVertical: 10,
  paddingHorizontal: 0,
  marginBottom: 12,
  transform: [{ scaleY: -1 }]
};

export default MessageBlock;
