// To create a client side application
import feathers from "feathers/client";
import rest from "feathers-rest/client";
import axios from "axios";
import store from './store';

const MSG_SENT = 'SENT';
const MSG_READ = 'READ';
const MSG_RECEIVED = 'RECEIVED';

const api = feathers().configure(rest("http://localhost:3030").axios(axios));

const ack = (msg, status)=> {
  return api
    .service("messages")
    .update(msg._id, msg)
    .then(response => {
      console.log('************************* ',response)
    })
    .catch(error => {
      console.log(error);
    });
}

const addListener = (cb) => {
  store.addListener("change", () => {
    console.log('===============> ','forceUpdate')
    cb()
  });
}

const removeListener = ()=> {
  store.removeAllListeners();
}

const updateLocalMessage = (msg, status, shouldAck = false) => {
  console.log('status, ',status, msg)
  store.write(() => {
    store.create("Messages", {...msg, status}, true);
    if(shouldAck){
      ack({...msg, status})
    }
  });
}

const loadMessages = (userId) => {
    console.log(userId);
    return api
      .service("messages")
      .find({ query: { to: userId }})
      .then(response => {
        response.data.map(item => {
          //create local
          updateLocalMessage(item, 'RECEIVED', true);
        });
      })
      .catch(error => {
        console.log(error);
      });
}

const countMessages = (id)=> {
  return store
          .objects("Messages")
          .filtered(`from = '${id}' AND status = '${MSG_RECEIVED}'`)
          .length;
}

const updateUser = (user)=> {
  store.write(() => {
    store.create("Users", user, true);
  });
}

const updateContacts = (contacts)=> {
  store.write(() => {
    contacts.map(item => store.create("Contacts", item, true));
  });
}

const sendMessage = (msg)=> {
  store.write(() => {
    store.create("Messages", msg);

    api
      .service("messages")
      .create(msg)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  });
}

const getMessages = (userId, contactId)=> {
  const messages = store
                    .objects("Messages")
                    .filtered(
                      `(from = '${userId}' AND to = '${contactId}') OR (from = '${contactId}' AND to = '${userId}')`
                    );        
  return messages.map(msg => Object.assign({}, msg)).reverse();                    
}

const getMessagesAsync = (userId, contactId)=> {
  return store
          .objects("Messages")
          .filtered(
            `(from = '${userId}' AND to = '${contactId}') OR (from = '${contactId}' AND to = '${userId}')`
          );        
}


const getContacts = ()=> {
  return store.objects("Contacts");
}

const clearDB = ()=> {
  //clean contacts on up
  store.write(() => {
    store.deleteAll();
  });
}

const realpub = {
  api,
  ack,
  store,
  loadMessages,
  countMessages,
  clearDB,
  updateUser,
  updateContacts,
  sendMessage,
  getMessages,
  getMessagesAsync,
  getContacts,
  updateLocalMessage,
  addListener,
  removeListener

}

export default realpub;
