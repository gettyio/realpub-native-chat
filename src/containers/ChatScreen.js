import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Image
} from "react-native";
import { Container, Content, Input, Item, Icon } from "native-base";
import TextMessage from "./../components/chat/TextMessage";
import MessageBlock from "./../components/chat/MessageBlock";
import Thumbnail from "./../components/chat/Thumbnail";
import Header from "./../components/Header";

class ChatScreen extends PureComponent {
  // static propTypes = {
  //   state: PropTypes.object.isRequired
  // };

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          key: 1,
          from: "user",
          username: "Dio",
          fullName: "Dio Ianakiara",
          message: "hello"
        }
      ]
    };
    this.getInitials = this.getInitials.bind(this);
    this.renderMessageBlock = this.renderMessageBlock.bind(this);
  }

  getInitials(string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  renderMessageBlock({ item }) {
    const initials = this.getInitials(item.fullName);
    return (
      <MessageBlock withStatus>
        <TextMessage message={item.message} from={item.from} last />
        <Thumbnail from={item.from} initials={initials} />
      </MessageBlock>
    );
  }

  render() {
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
              data={this.state.messages}
              renderItem={this.renderMessageBlock}
            />
            {/*<MessageBlock>
            <TextMessage message="Hello there!" from="contact" />
            <TextMessage message="How are you?" from="contact" last />
            <Thumbnail from="contact" initials="MP" />
          </MessageBlock>
          <MessageBlock withStatus>
            <TextMessage message="I'm fine" from="user" />
            <TextMessage message="Thank you" from="user" last />
            <Thumbnail from="user" initials="JR" />
          </MessageBlock>
          <MessageBlock>
            <TextMessage
              message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
              from="contact"
              last
            />
            <Thumbnail from="contact" initials="MP" />
          </MessageBlock>*/}
          </Content>
        </Image>

        <View>
          <Item
            style={{ borderBottomWidth: 0, paddingLeft: 8, paddingRight: 0 }}
          >
            <Input placeholder="Type something..." />
            <TouchableOpacity
              onPress={() => {}}
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
