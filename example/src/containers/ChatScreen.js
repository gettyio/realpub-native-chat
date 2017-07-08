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
import InvertibleScrollView from "react-native-invertible-scroll-view";
import TextMessage from "./../components/chat/TextMessage";
import MessageBlock from "./../components/chat/MessageBlock";
import Thumbnail from "./../components/chat/Thumbnail";
import Header from "./../components/Header";
import realpub from './../lib/realpub'

class ChatScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messagesRead: []
    };

    this.getInitials = this.getInitials.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveAndSendMessage = this.saveAndSendMessage.bind(this);
    this.renderMessageBlock = this.renderMessageBlock.bind(this);
  }

  componentDidMount() {
    const { user, contact } = this.props.location.state;
    realpub
      .getMessagesAsync(user._id, contact._id)
      .addListener(() => {
        const messages = realpub.getMessages(user._id, contact._id);
        this.setState({ messages });
      });
  }

  componentWillUnmount() {
    // Unregister all listeners
    realpub.store.removeAllListeners();
  }

  handleInput(text) {
    this.setState({ text: text });
  }

  // save the message on db and send to
  // correspondent user
  saveAndSendMessage() {
    if (this.state.text) {
      const { user, contact, apikey } = this.props.location.state;
      const textmessage = this.state.text;
      const msg = {
        uuid: uuid(),
        from: user._id,
        to: contact._id,
        body: textmessage,
        status: 'SENT'
      };
      realpub.sendMessage(msg);

      this.handleInput("");
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

  sendReadEvent(msg) {
    const { contact } = this.props.location.state;
    const { messagesRead } = this.state;
    const isAlreadySent = messagesRead.length && messagesRead.find(m => m.id === msg.id);
    if (contact.id === msg.from && msg.status === "SENT" || msg.status === "RECEIVED" && !isAlreadySent) {
      this.setState({ messagesRead: [...messagesRead, msg] });
    }
  }

  renderMessageBlock({ item, index }) {
    const { user, contact, apikey } = this.props.location.state;

    let from, withStatus;
    if (user._id === item.from) {
      from = "user";
      withStatus = true;
    } else {
      from = "contact";
      withStatus = false;
    }

    if(from && item.status === 'RECEIVED') {
      realpub.updateLocalMessage(item, 'READ', true)
    }

    return (
      <MessageBlock withStatus={withStatus} key={index} status={item.status}>
        <Thumbnail from={from} initials={"DI"} />
        <TextMessage message={item.body} from={from} last />
      </MessageBlock>
    );
  }

  render() {
    const { user, contact } = this.props.location.state;
    const messages = realpub.getMessages(user._id, contact._id);

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
              inverted={true}
              data={messages}
              renderItem={this.renderMessageBlock}
              keyExtractor={(item, index) => `${item}-${index}`}
              style={{
                paddingBottom: 32,
                paddingLeft: 8,
                paddingRight: 8
              }}
            />
          </Content>
        </Image>
        <KeyboardAvoidingView behavior="padding">
          <Item
            style={{ borderBottomWidth: 0, paddingLeft: 8, paddingRight: 0 }}
          >
            <Input
              placeholder="Type something..."
              autoCorrect={false}
              value={this.state.text}
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
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = {
  content: {
    backgroundColor: "transparent",
    transform: [{ scaleY: -1 }]
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
