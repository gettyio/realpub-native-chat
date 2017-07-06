import React, { Component } from 'react'
import { List } from 'native-base'

const ListItems = ({children, ...props}) => (
	<List {...props}>
		{ children }
	</List>
)

export { ListItems }
