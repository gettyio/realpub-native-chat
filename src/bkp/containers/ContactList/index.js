import React, { Component } from "react";
import { Container, Content, Button, Text } from "native-base";
import { View, ScrollView } from "react-native";
import HeaderChat from "../components/Header";
import { UserList } from "../components/UserList";
import { init, on, emit, send } from "../../../services/realpub";
import { Actions } from "react-native-router-flux";
import { addUserActive, removeUserInactive } from "../actions";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner";

/**
 * ContactList
 * The Component That Will Render
 * the users list of the chat
 */
export default class ContactList extends Component {
  state = {
    unread_messages: [],
    isLoading: true,
    isChatReady: false
  };
  componentWillMount() {
    const { user, apikey, store } = this.props;
    // just connects one time
    init(this.props.apikey).then(socket => {
      /**
      * Register Initial Events
      */

      // when some user are online, the this event will be
      // sended by the server
      socket.on("chat::user::online", data => console.log("User online", data));
      socket.on("chat::user::online::error", err => console.log(err));

      // when I close the app, emit the event telling
      // that I'm offline
      socket.on("disconnect", () => {
        socket.send("chat::user::set::offline", {
          id: user.id,
          apikey
        });
      });

      // when the unread message return an error
      socket.on("chat::got::unread_messages::error", err => console.warn(err));

      // get all unread messages
      socket.on("chat::got::unread_messages", messages => {
        // have unread messages?
        messages.length > 0
          ? this.setState({
              unread_messages: messages
            })
          : null;
      });

      // When I'm not on the chat screen, and any user
      // is active, notify me

      socket.on(`chat::user::notify::${user.id}::is::active`, data => {
        store.dispatch(addUserActive(data.id));
      });

      socket.on(`chat::user::notify::${user.id}::is::inactive`, data => {
        store.dispatch(removeUserInactive(data.id));
      });

      // when someone sends a message to me
      // Insert the badge on correspondent user
      // Or notify the user
      socket.on(`chat::message::${user.id}`, data => {
        console.log(JSON.stringify(data));
      });

      this.setState({ isLoading: false, isChatReady: true });
    });
  }

  componentDidMount() {
    const { user, apikey } = this.props;
    /**
    * Emit initial Events
    */

    // set my status as online
    send("chat::user::set::online", {
      id: user.id,
      apikey
    });

    // get all unread messages sended to me
    send("chat::get::all::unread_messages", {
      apikey,
      from: user.id
    });

    // tell users with the conversation screen with my id
    // that I'm online
    emit(`chat::user::${user.id}::is::now::online`, {
      id: user.id
    });
  }

  getUser(toUser) {
    return () => {
      Actions.conversation({
        to: toUser.id,
        apikey: this.props.apikey,
        user: this.props.user,
        store: this.props.store
      });
    };
  }

  render() {
    const { isLoading, isChatReady } = this.state;

    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: 120,
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <LoadingSpinner spinnerColor={"#009688"} />
        </View>
      );
    }

    return (
      <View
        style={{
          backgroundColor: "#eee",
          marginTop: 64
        }}
      >
        <UserList
          getUser={this.getUser.bind(this)}
          users={this.props.contactList}
        />
      </View>
    );
  }
}
