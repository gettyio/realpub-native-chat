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
import { Link } from "react-router-native";

import Header from "./../components/Header";
import ChatScreen from "./ChatScreen";
import ContactCard from "./../components/contacts/ContactCard";

class ContactListScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.showChatHistory = this.showChatHistory.bind(this);
  }

  showChatHistory() {
    console.warn(1);
  }

  renderRow(row) {
    return (
      <ContactCard
        {...row.item}
        key={row.index}
        onPress={this.showChatHistory}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header enableLeftBtn={false} />
        <FlatList data={this.props.contactList} renderItem={this.renderRow} />
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
