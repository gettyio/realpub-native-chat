import React, { Component } from "react";
import { Actions, Scene, Router } from "react-native-router-flux";
import Conversation from "./Conversation";
import ContactList from "./ContactList";
import { store } from "./store";

// lpubNativeChat apikey="" fromId="" contactList={ USERS }/>
export default class RealpubNativeChat extends Component {
  render() {
    //const { contactList, fromId, apikey } = this.props

    return (
      <Router>
        <Scene key="root">
          <Scene
            key="contactList"
            user={{ id: "9" }}
            apikey="5dy93449j0cuaeld"
            contactList={[
              {
                id: "1",
                name: "Luis",
                url:
                  "https://avatars3.githubusercontent.com/u/8241121?v=3&s=460"
              }
            ]}
            titleStyle={{ color: "#fff" }}
            store={store}
            initial={true}
            navigationBarStyle={{ backgroundColor: "#009688" }}
            component={ContactList}
            titleStyle={{ color: "#fff" }}
            title="Chat"
            barButtonIconStyle={{ tintColor: "rgb(255,255,255)" }}
          />
          <Scene
            key="conversation"
            user={{ id: "9" }}
            apikey="5dy93449j0cuaeld"
            store={store}
            component={Conversation}
            title="Conversa"
            navigationBarStyle={{ backgroundColor: "#009688" }}
            leftTitle="Voltar"
            titleStyle={{ color: "#fff" }}
            barButtonIconStyle={{ tintColor: "rgb(255,255,255)" }}
          />
        </Scene>
      </Router>
    );
  }
}
