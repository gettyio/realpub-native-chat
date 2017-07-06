import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import DeliveryStatus from './DeliveryStatus';

const renderStatus = (withStatus) => {
  return withStatus && <DeliveryStatus />;
};

const MessageBlock = ({ children, withStatus }) => (
  <View style={styles}>
    {children}
    {renderStatus(withStatus)}
  </View>
);

MessageBlock.propTypes = {
  children: PropTypes.node.isRequired,
  withStatus: PropTypes.bool,
};

MessageBlock.defaultProps = {
  withStatus: false
};

const styles = {
  position: 'relative',
  marginVertical: 5,
  paddingHorizontal: 25,
  marginBottom: 12
};

export default MessageBlock;
