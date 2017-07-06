import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import DeliveryStatus from "./DeliveryStatus";

const renderStatus = (withStatus, status) => {
  return withStatus && <DeliveryStatus status={status} />;
};

const MessageBlock = ({ children, withStatus, status }) =>
  <View style={styles}>
    {children}
    {renderStatus(withStatus, status)}
  </View>;

MessageBlock.propTypes = {
  children: PropTypes.node.isRequired,
  withStatus: PropTypes.bool
};

MessageBlock.defaultProps = {
  withStatus: false
};

const styles = {
  position: "relative",
  marginVertical: 5,
  paddingHorizontal: 0,
  marginBottom: 12,
  transform: [{ scaleY: -1 }]
};

export default MessageBlock;
