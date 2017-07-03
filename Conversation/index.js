import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Label,
  Input,
  Form,
  Footer,
  FooterTab
} from "native-base";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ListView,
  TextInput,
  ActivityIndicator
} from "react-native";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import HeaderChat from "../components/Header";
import { Message } from "../components/Message";
import { UserList } from "../components/UserList";
import { on, emit, send } from "../../../services/realpub";

/**
 * NativeChat
 * The Component That Will Render
 * the users list of the chat
 */
export default class Conversation extends Component {
  constructor() {
    super();
    this.renderMessage = this.renderMessage.bind(this);
    this.state = {
      text: "",
      toUserIsOnline: false,
      unread_messages: [],
      messageStatus: "UNREAD",
      conversation: [],
      loading: true,
      rowsDiff: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }
  componentDidMount() {
    const { apikey, to, user, store } = this.props;
    /**
     * Registering all events
     */

    // check if the user is active
    if (store.getState().activeUsers.includes(to)) {
      this.setState({
        messageStatus: "READ"
      });
    }

    // check the status of the 'To' user
    on(`chat::${user.id}::checked::user::is::online`, status => {
      status
        ? this.setState({
            toUserIsOnline: status,
            messageStatus: store.getState().activeUsers.includes(to)
              ? "READ"
              : "UNREAD"
          })
        : null;
    });

    on("chat::checked::user::is::online::error", err => console.warn(err));
    on("chat::saved::message::error", err => console.warn(err));

    // Is that relevant?
    on("chat::saved::message", data => console.log("Saved message", data));

    // If I'm with the chat active and the user
    // send a message to me, append the message
    // on the active chat screen
    on(`chat::active::message::${user.id}`, data => {
      const messages = [].concat(this.state.conversation);
      messages.push(data);
      this.setState({
        conversation: messages
      });
    });

    // when the user 'To' is online, change the status
    // and the state of the 'To' user for online
    on(`chat::user::${to}::is::now::online`, data =>
      this.setState({
        toUserIsOnline: true
      })
    );

    // when the user open or close the active screen to chat with me
    // change the correspondent message status
    on(`chat::user::${to}::is::now::active`, data => {
      // get all messages as UNREAD and change
      // the status to READ, because the 'To' user
      // opened the screen with my conversation ( it's active)
      // and Read all Unread messages
      const newMessageStatus = [].concat(this.state.conversation);

      newMessageStatus.forEach(message => {
        if (message.status === "UNREAD") {
          message.status = "READ";
        }
      });

      // Update the state with new message status
      // and the new conversation messages status
      this.setState({
        messageStatus: "READ",
        conversation: newMessageStatus
      });
    });

    on(`chat::user::${to}::is::now::inactive`, data =>
      this.setState({
        messageStatus: "UNREAD"
      })
    );

    // get all unread messages, but it's necessary?
    // try save the all unread messages on app state,
    // then use it here
    on(`chat::${user.id}::got::unread_messages`, messages => {
      messages.length > 0
        ? this.setState({
            unread_messages: messages
          })
        : null;

      const unreadMessagesByUser = messages.filter(
        message => message.from == to
      );
      if (unreadMessagesByUser.length > 0) {
        send("chat::remove::unread::messages", {
          apikey,
          to,
          from: user.id
        });
        send("chat::change::message::status", {
          apikey,
          to,
          from: user.id,
          status: "READ"
        });
        this.setState({
          unread_messages: []
        });
      }
    });

    /**
     * Emit events
     */

    // if have unread messages, clean all unread messages
    // with the to id, because read the messages
    send("chat::get::all::unread_messages", {
      apikey,
      from: user.id
    });

    // check the status of the 'To' user
    send("chat::check::user::is::online", {
      apikey,
      to,
      from: user.id
    });

    // get fully conversation
    send("chat::get::conversation", {
      apikey,
      to,
      from: user.id
    });
    // Notify the user that I'm active on the screen
    emit(`chat::check::user::${to}::is::active`);
    on(`chat::checked::user::${to}::is::active`, data => {
      // get all messages as UNREAD and change
      // the status to READ, because the 'To' user
      // opened the screen with my conversation ( it's active)
      // and Read all Unread messages
      const newMessageStatus = [].concat(this.state.conversation);

      newMessageStatus.forEach(message => {
        if (message.status === "UNREAD") {
          message.status = "READ";
        }
      });

      // Update the state with new message status
      // and the new conversation messages status
      this.setState({
        messageStatus: "READ",
        conversation: newMessageStatus
      });
    });

    // Notify the user that I'm active on the screen
    emit(`chat::user::${user.id}::is::now::active`);
    emit(`chat::user::notify::${to}::is::active`, {
      id: user.id
    });

    // get the fully conversation response between users
    on(`chat::${user.id}::got::conversation`, conversation => {
      console.log("PEGOU CONVERSAS", conversation);
      this.setState({
        conversation,
        loading: false
      });

      const unreadMessagesByUser = conversation.filter(
        message => message.from == to && message.status === "UNREAD"
      );

      // if the user is active on the moment that
      // I enter on the chat, change all messages to READ
      // on my screen
      if (store.getState().activeUsers.includes(to)) {
        console.log("Ta ativo");

        const newMessagesWithStatus = this.state.conversation.map(message => {
          if (message.status === "UNREAD") {
            message.status = "READ";
          }
          return message;
        });

        this.setState({
          conversation: newMessagesWithStatus
        });
      } else {
        const unreadMessagesByToUser = this.state.conversation.map(message => {
          if (message.from === to && message.status === "UNREAD") {
            message.status = "READ";
          }
          return message;
        });

        this.setState({
          conversation: unreadMessagesByToUser
        });
      }

      if (unreadMessagesByUser.length > 0) {
        send("chat::change::message::status", {
          apikey,
          to,
          from: user.id,
          status: "READ"
        });
        this.setState({
          unread_messages: []
        });
      }
    });
  }

  componentWillUnmount() {
    const { to, user } = this.props;
    // now the user will close the main conversation
    // screen, all messages sended to me will be
    // UNREAD
    emit(`chat::user::${this.props.user.id}::is::now::inactive`);
    emit(`chat::user::notify::${to}::is::inactive`, { id: user.id });
  }

  handleInput(text) {
    this.setState({ text: text });
  }

  // save the message on db and send to
  // correspondent user
  saveAndSendMessage() {
    const data = {
      from: this.props.user.id,
      to: this.props.to,
      status: this.state.messageStatus,
      timestamp: Date.now(),
      message: this.state.text
    };

    if (this.state.text) {
      // if the 'To' user is offline, save the message
      // on unread collection
      if (!this.state.toUserIsOnline) {
        // save the message on the UNREAD, because the user are offline
        send(
          "chat::save::message::when::user::offline",
          Object.assign({}, { apikey: this.props.apikey }, data)
        );
      }

      // save the message on database and emit the event
      send(
        "chat::save::message",
        Object.assign({}, { apikey: this.props.apikey }, data)
      );

      // if the user is online, emit the event with the message
      if (this.state.messageStatus === "READ") {
        //console.warn("active");
        emit(`chat::active::message::${this.props.to}`, data);
      } else {
        emit(`chat::message::${this.props.to}`, data);
      }

      // append the user message on chat
      const appendMessage = [].concat(this.state.conversation);
      appendMessage.push(data);
      //console.warn("Init Realpub 0");

      this.setState({ conversation: appendMessage, text: "" });
    }
  }

  renderMessage(message) {
    const { user } = this.props;
    return <Message message={message} user={user} />;
  }

  render() {
    const { rowsDiff, conversation } = this.state;

    const rowIds = conversation.map((row, index) => index).reverse();
    const dataSource = rowsDiff.cloneWithRows(conversation, rowIds);

    return (
      <View style={{ flex: 1, backgroundColor: "white", marginTop: 50 }}>
        <View style={{ flex: 1 }}>
          <ListView
            renderScrollComponent={props =>
              <InvertibleScrollView {...props} inverted />}
            dataSource={dataSource}
            renderRow={this.renderMessage}
            renderSeparator={this.renderSeparator}
            ref={ref => {
              this.messageList = ref;
            }}
            enableEmptySections={true}
          />
        </View>
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            paddingLeft: 20,
            borderTopWidth: 0.5,
            borderTopColor: "#c3c3c3",
            paddingTop: 2
          }}
        >
          <TextInput
            style={{ width: "80%", height: "100%" }}
            onChangeText={this.handleInput.bind(this)}
            multiline={true}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Mensagem"
          />
          <TouchableOpacity
            onPress={this.saveAndSendMessage.bind(this)}
            style={{ paddingRight: 20 }}
          >
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
