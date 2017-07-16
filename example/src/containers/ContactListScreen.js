import React, {
  Component
} from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  StatusBar,
  AppState,
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
import ContactCardBlank from "./../components/contacts/ContactCardBlank";

class ContactListScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      isChatReady: false,
      contacts: props.contacts || [],
      messagesCount: 0,
      currentUser: null,
      appState: AppState.currentState
    };

    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.handleRenderer = this.handleRenderer.bind(this);
    this.renderContactList = this.renderContactList.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    
    const { realpub } = props;
    realpub.updateUser(props.user);
  }

  componentDidMount() {
    const { realpub, user, contacts } = this.props;
    this.setState({
      isLoading: false
    });

    realpub
      .getReceivedMessages()
      .addListener(() => {
        const updatedContacts = contacts.map(item => {
          const toRead = realpub.countMessages(item._id);
          return {
            ...item,
            toRead
          }
        })
        this.setState({ contacts: updatedContacts });
      });

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { realpub, user } = this.props;
    // App has come to the foreground!
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      realpub.checkSentMessageStatus(user._id);
      realpub.resendOfflineMessages(user._id);
    }
    this.setState({ appState: nextAppState });
  }

  renderRow(row) {
    const {
      user,
      apikey,
      renderContactsRow,
    } = this.props;

    if (renderContactsRow) {
      return (
        <ContactCardBlank
          key={row.index }
          apikey={apikey}
          user={user}
          contact={row.item}
          toRead={row.item.toRead}        
        >
          {renderContactsRow(row.item)}
        </ContactCardBlank>
      )
    }

    return ( 
      <ContactCard 
        key={row.index }
        apikey={apikey}
        user={user}
        contact={row.item}
        toRead={row.item.toRead}
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
    const { contacts } = this.state;
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

  renderHeader() {
    const { user, hideHeader, renderContactsHeader } = this.props;
    if (hideHeader) {
      return <View></View>;
    }
    
    if (renderContactsHeader) {
      return renderContactsHeader(user);
    }

    return (
       <Header enableLeftBtn={false} user={user} />
    );
  }

  render() {
    return ( 
      <View style = {styles.container} >
        {this.renderHeader()}
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