"use strict";

import Realm from "realm";

const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "string",
    username: "string",
    firstName: "string",
    lastName: "string",
    avatar: { type: "string", optional: true },
    email: { type: "string", optional: true },
    status: { type: "string", default: "OFFLINE", optional: true }
  }
};

class User {
  setStatus(status) {
    this.status = status;
  }

  sendMessage(message) {
    console.log(message);
  }
}
User.schema = UserSchema;

// Contact
const ContactSchema = {
  name: "Contact",
  primaryKey: "id",
  properties: {
    id: "string",
    username: "string",
    firstName: "string",
    lastName: "string",
    avatar: { type: "string", optional: true },
    email: { type: "string", optional: true },
    status: { type: "string", default: "OFFLINE", optional: true }
  }
};

class Contact {}
Contact.schema = ContactSchema;

const MessageSchema = {
  name: "Message",
  primaryKey: "id",
  properties: {
    id: "string",
    from: "string",
    to: "string",
    msg: "string",
    status: { type: "string", default: "SENT" },
    timestamp: "date"
  }
};

class Message {}
Message.schema = MessageSchema;

export default new Realm({
  schema: [User, Contact, Message],
  schemaVersion: 13
});
