import React, { Component } from 'react'
import { Thumbnail, Text, Body, Left, Right } from 'native-base'
import { Item } from '../Item'

const User = ({name, id, url, getUser }) => (
  <Item avatar onPress={ () => {getUser() }}>
    <Left>
      <Thumbnail source={{uri: url}} />
    </Left>
    <Body>
      <Text>{name}</Text>	
			<Text note>Doing what you like will always keep you happy . .</Text>
    </Body>
    <Right>
      <Text>{id}</Text>
    </Right>
  </Item>
)
export { User }
