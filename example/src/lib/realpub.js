// To create a client side application
import store from './store';

const MSG_SENT = 'SENT';
const MSG_READ = 'READ';
const MSG_RECEIVED = 'RECEIVED';

//const api = feathers().configure(rest("http://localhost:3030").axios(axios));
import Realpub from './../realpub-client';

let conn;
const connect = async (uID)=> {
  conn = await Realpub.connect(`http://localhost:8080?token=${uID}`, { strategy: [ 'online', 'timeout', 'disconnect' ]});
  conn.on('open', function () {
    // receive a new message from a friend
    conn.on(`realpub::message::${uID}`, (msg, cb)=> {
      // Save local NEW message
      store.write(() => {
        store.create("Messages", msg, true);
      });
      cb({ ...msg, status: 'RECEIVED' });
    });

    conn.on(`realpub::read::from::${uID}`, (msg, cb)=> {
        store.write(() => {
          store.create("Messages", msg, true);
        });      
    });

    // receive messages to sync
    conn.on(`realpub::sync::${uID}`, function (msgs, cb) {
      let ids = [];
      msgs.map(m => {
        let status;
        if (m.status === 'SENT' || 'RECEIVED') {
          status = 'RECEIVED';
        } else if (m.status === 'READ') {
          status = 'READ';
        }

        store.write(() => {
          store.create("Messages", {...m, status}, true);
        });

        ids.push({_id: m._id, status: status});
      });
      // send an array of message ids to mark as RECEIVED on remote db
      cb(ids); //confirm action
    });

    // resend NEW messages that went offline
    const messages = store.objects("Messages").filtered(`status = 'NEW'`);
    messages.map(msg => {
      // Save remote NEW message
      conn.send('realpub::send::message', msg, (status)=> {
        store.write(() => {
          // Update local with SENT ack from server
          store.create("Messages", { ...msg, status }, true); // server ack
        });    
      });
    });                   
  });
}

const ack = (msg, status)=> {
  // return api
  //   .service("messages")
  //   .update(msg._id, msg)
  //   .then(response => {
  //     console.log('************************* ',response.status)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
}

const addListener = (cb) => {
  store.addListener("change", () => {
    cb()
  });
}

const removeListener = ()=> {
  store.removeAllListeners();
}

const updateLocalMessage = (msg, status, shouldAck = false) => {
  //console.log('status, ',status, msg)
  store.write(() => {
    store.create("Messages", {...msg, status}, true);
    if(shouldAck){
      ack({...msg, status})
    }
  });
}

const markAsRead = (msg) => {
    const status = 'READ';
    console.log(msg)
    if (msg.status === 'RECEIVED') {
      conn.send('realpub::read::message', {...msg, status } , (msgAck, err)=> {
        if (err) {
          console.warn('ERROR', err)
        } else {
          console.log('msgAck', msgAck)
          store.write(() => {
            // Update local with SENT ack from server
            store.create("Messages", msgAck, true); // server ack
          });
        }
      });  
    }
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
  // Save local NEW message
  store.write(() => {
    store.create("Messages", msg);
  });
  // Save remote NEW message
  conn.send('realpub::send::message', msg, (status)=> {
    store.write(() => {
      // Update local with SENT ack from server
      store.create("Messages", { ...msg, status }, true); // server ack
    });    
  });
}

const getMessages = (userId, contactId)=> {
  return store
          .objects("Messages")
          .filtered(
            `(from = '${userId}' AND to = '${contactId}') OR (from = '${contactId}' AND to = '${userId}')`
          ).map(msg => Object.assign({}, msg)).reverse();      
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
  ack,
  store,
  countMessages,
  clearDB,
  updateUser,
  updateContacts,
  sendMessage,
  getMessages,
  getMessagesAsync,
  getContacts,
  markAsRead,
  addListener,
  removeListener
}

const init = (uID)=> {
  const token = uID;
  const conn = connect(uID);
  return { ...realpub, conn, token };
}

export default (uID) => init(uID);