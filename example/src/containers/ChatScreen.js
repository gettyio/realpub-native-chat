import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  KeyboardAvoidingView
} from "react-native";
import uuid from "uuid/v4";
import { Container, Content, Input, Item, Icon } from "native-base";

import TextMessage from "./../components/chat/TextMessage";
import MessageBlock from "./../components/chat/MessageBlock";
import Thumbnail from "./../components/chat/Thumbnail";
import Header from "./../components/Header";
import Realpub from "./../services/realpub";
import store from "./../store";

class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      toUserIsOnline: false,
      unread_messages: [],
      messageStatus: "UNREAD",
      conversation: [],
      loading: true
    };

    this.getInitials = this.getInitials.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveAndSendMessage = this.saveAndSendMessage.bind(this);
    this.renderMessageBlock = this.renderMessageBlock.bind(this);
  }

  componentWillUnmount() {
    const { user, contact } = this.props.location.state;
  }

  handleInput(text) {
    this.setState({ text: text });
  }

  // save the message on db and send to
  // correspondent user
  saveAndSendMessage() {
    const { user, contact, apikey } = this.props.location.state;
    const textmessage = this.state.text;
    const msg = {
      id: uuid(),
      from: user.id,
      to: contact.id,
      msg: textmessage,
      timestamp: new Date()
    };
    console.log(msg);
    store.write(() => {
      store.create("Message", msg);
    });

    if (this.state.text) {
      this.handleInput("");
      Realpub.emit(`chat::send::message::to::${user.id}`, msg);
    }
  }

  getInitials(string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  renderMessageBlock({ item, index }) {
    const { user, contact, apikey } = this.props.location.state;
    const from = user.id === item.from ? "user" : "contact";
    return (
      <MessageBlock key={index} status={item.status} withStatus>
        <TextMessage message={item.msg} from={from} last />
        <Thumbnail from={from} initials={"DI"} />
      </MessageBlock>
    );
  }

  render() {
    const { user, contact } = this.props.location.state;
    const messages = store
      .objects("Message")
      .filtered(
        `(from = ${user.id} AND to = ${contact.id}) OR (from = ${contact.id} AND to = ${user.id})`
      );
    return (
      <Container>
        <Header enableLeftBtn={true} />

        <Image
          source={require("./../assets/img/gplaypattern.png")}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "repeat"
          }}
        >
          <Content padder style={styles.content}>
            <FlatList
              data={messages}
              renderItem={this.renderMessageBlock}
              keyExtractor={(item, index) => index}
            />
          </Content>
        </Image>

        <View>
          <Item
            style={{ borderBottomWidth: 0, paddingLeft: 8, paddingRight: 0 }}
          >
            <Input
              placeholder="Type something..."
              autoCorrect={false}
              onChangeText={this.handleInput}
            />
            <TouchableOpacity
              onPress={this.saveAndSendMessage}
              style={{
                backgroundColor: "transparent",
                padding: 16
              }}
            >
              <Icon style={{ color: "gray" }} name="md-send" />
            </TouchableOpacity>
          </Item>
          {/*<View style={styles.inputTypes}>
            <Icon style={styles.inputTypeActive} name="ios-text-outline" />
            <Icon style={styles.inputType} name="ios-camera-outline" />
            <Icon style={styles.inputType} name="ios-images-outline" />
            <Icon style={styles.inputType} name="ios-happy-outline" />
            <Icon style={styles.inputType} name="ios-musical-notes-outline" />
            <Icon style={styles.inputType} name="ios-navigate-outline" />
            <Icon style={styles.inputType} name="ios-more" />
          </View>*/}
        </View>
      </Container>
    );
  }
}

const styles = {
  content: {
    backgroundColor: "transparent"
  },
  inputTypes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  },
  inputType: {
    color: "#777"
  },
  inputTypeActive: {
    color: "#0084FF"
  }
};

export default ChatScreen;
