import React, { Component } from 'react';
import { ListItem } from 'native-base';

const Item = ({children, ...props}) => (
  <ListItem {...props}>
    { children }
  </ListItem>
)

export { Item }