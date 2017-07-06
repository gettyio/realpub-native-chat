import React, { PureComponent } from "react";
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
import { Spinner } from "native-base";
import { Link } from "react-router-native";

import Header from "./../components/Header";
import ChatScreen from "./ChatScreen";
import ContactCard from "./../components/contacts/ContactCard";

import store from "./../store";

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
    this.handleRenderer = this.handleRenderer.bind(this);
    this.renderContactList = this.renderContactList.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.showChatHistory = this.showChatHistory.bind(this);

    // const user = props.user;
    // store.write(() => {
    //   let currentUser = store.create("User", user, true);
    //   currentUser.setStatus("ONLINE");
    // });

    // const contacts = props.contacts;
    // store.write(() => {
    //   contacts.map(item => store.create("Contact", item, true));
    // });
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  showChatHistory() {
    console.warn(1);
  }

  renderRow(row) {
    const { user, apikey } = this.props;
    return (
      <ContactCard
        key={row.index}
        apikey={apikey}
        user={user}
        contact={row.item}
        onPress={this.showChatHistory}
      />
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="blue" />
      </View>
    );
  }

  renderContactList() {
    const contacts = this.state.contacts;
    return (
      <FlatList
        data={contacts}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => item.id}
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
      <View style={styles.container}>
        <Header enableLeftBtn={false} />
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
