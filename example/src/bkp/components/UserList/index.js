import React, { Component } from 'react'
import  { ListItems } from '../List-Items'
import { User } from '../User'

const UserList = ({users, getUser}) => ( 
  <ListItems>
    {users.map( (user, i) => <User getUser={getUser(user)} key={i} name={user.name} id={user.id} url={user.url} />) }
  </ListItems>
)


export { UserList }