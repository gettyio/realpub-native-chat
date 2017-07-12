"use strict";

import Realm from "realm";

const UsersSchema = {
  name: "Users",
  primaryKey: "_id",
  properties: {
    _id: "string",
    displayName: "string",
    fullName: "string",
    avatar: {
      type: "string",
      optional: true
    },
    email: {
      type: "string",
      optional: true
    },
    status: {
      type: "string",
      default: "OFFLINE",
      optional: true
    }
  }
};

class Users {
  setStatus(status) {
    this.status = status;
  }

  sendMessage(message) {
    console.log(message);
  }
}
Users.schema = UsersSchema;

// Contact
const ContactsSchema = {
  name: "Contacts",
  primaryKey: "_id",
  properties: {
    _id: "string",
    displayName: "string",
    fullName: "string",
    avatar: {
      type: "string",
      optional: true
    },
    email: {
      type: "string",
      optional: true
    },
    status: {
      type: "string",
      default: "OFFLINE",
      optional: true
    }
  }
};

class Contacts {}
Contacts.schema = ContactsSchema;

const MessagesSchema = {
  name: "Messages",
  primaryKey: "uuid",
  properties: {
    _id: { type: "string", optional: true },
    uuid: "string",
    from: "string",
    to: "string",
    body: "string",
    status: {
      type: "string"
    }
  }
};

class Messages {}
Messages.schema = MessagesSchema;

export default new Realm({
  schema: [Users, Contacts, Messages],
  schemaVersion: 19
});