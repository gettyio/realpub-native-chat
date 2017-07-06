import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import PropTypes from 'prop-types';

const TextMessage = ({ message, from, last }) => (
  <View
    style={[
      styles.messageWrapper,
      styles[`${from}MessageWrapper`],
      last && styles[`${from}LastMessage`]
    ]}
  >
    <Text style={styles[`${from}Message`]}>{message}</Text>
  </View>
);

TextMessage.propTypes = {
  message: PropTypes.string.isRequired,
  from: PropTypes.oneOf(['contact', 'user']).isRequired,
  last: PropTypes.bool
};

TextMessage.defaultProps = {
  last: false
};

const styles = {
  messageWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
    borderRadius: 20
  },
  contactMessageWrapper: {
    backgroundColor: '#F1F0F0',
    alignSelf: 'flex-start'
  },
  contactMessage: {
    color: '#000'
  },
  contactLastMessage: {
    borderBottomLeftRadius: 2
  },
  userMessageWrapper: {
    backgroundColor: '#0084FF',
    alignSelf: 'flex-end'
  },
  userMessage: {
    color: '#fff'
  },
  userLastMessage: {
    borderBottomRightRadius: 2
  }
};

export default TextMessage;
