import React, {
  PureComponent
} from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import {
  Spinner
} from "native-base";
import {
  Link
} from "react-router-native";

import Header from "./../components/Header";
import ChatScreen from "./ChatScreen";
import ContactCard from "./../components/contacts/ContactCard";

import realpub from "./../lib/realpub";

class ContactListScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isChatReady: false,
      contacts: [],
      currentUser: null
    };

    this.renderRow = this.renderRow.bind(this);
    this.listenUpdates = this.listenUpdates.bind(this);
    this.handleRenderer = this.handleRenderer.bind(this);
    this.renderContactList = this.renderContactList.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.showChatHistory = this.showChatHistory.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.getTotalUnreadedMessages = this.getTotalUnreadedMessages.bind(this);

    realpub.updateUser(props.user);
    realpub.updateContacts(props.contacts);
  }

  componentDidMount() {
    const { user } = this.props;
    this.loadMessages(user._id);
    this.listenUpdates();

    this.setState({
      isLoading: false
    });
  }

  showChatHistory() {
    console.warn(1);
  }

  listenUpdates() {
    realpub.store.addListener('change', () => {
      this.forceUpdate();
    });
  }

  loadMessages(userId) {
    realpub.loadMessages(userId);
  }

  getTotalUnreadedMessages(id) {
    return realpub.countMessages(id);
  }

  renderRow(row) {
    const {
      user,
      apikey
    } = this.props;
    const total = this.getTotalUnreadedMessages(row.item._id);

    return ( 
      <ContactCard key={row.index }
        apikey={apikey}
        user={user}
        contact={row.item}
        onPress={this.showChatHistory}
        toRead={total}
      />
    );
  }

  renderLoading() {
    return ( 
      <View style = {{flex: 1, justifyContent: "center"}} >
        <Spinner color = "blue" />
      </View>
    );
  }

  renderContactList() {
    const contacts = realpub.getContacts();
    return ( 
      <FlatList 
        data = {contacts}
        renderItem = {this.renderRow}
        keyExtractor = {(item, index) => item._id}
      />
    );
  }

  handleRenderer() {
    const { isLoading } = this.state;
    if (isLoading) return this.renderLoading();

    return this.renderContactList();
  }

  render() {
    return ( 
      <View style = {styles.container} >
        <Header enableLeftBtn = {false} /> 
        {this.handleRenderer()} 
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ContactListScreen;