// To create a client side application
import store from './store';
import * as events from './events';
import client from './client';
//const api = feathers().configure(rest("http://localhost:3030").axios(axios));


let conn;
const connect = async (uID)=> {
  conn = await client.connect(`http://realpub-dev.ad8pxc8stn.us-east-1.elasticbeanstalk.com:9090?token=${uID}`, { strategy: [ 'online', 'timeout', 'disconnect' ]});
  conn.on('open', function () {

    // receive a new message from a friend
    conn.on('data', (msg)=> {
      switch (msg.type) {
        case 'SENT':
          events.save(conn, msg.data);
          break;
        case 'RECEIVED': 
          events.update(conn, msg.data);
          break;          
        case 'READ': 
          events.update(conn, msg.data);
          break;         
        case 'SYNC': 
          events.sync(conn, msg.data);
          break;                          
        default:
          break;
      }
      // Save local NEW message
      // store.write(() => {
      //   store.create("Messages", msg, true);
      // });
      //cb({ ...msg, status: 'RECEIVED' });
    });

    // receive messages to sync
    // conn.on(`realpub::sync::${uID}`, function (msgs, cb) {
    //   console.warn('received sync', msgs)
    //   let ids = [];
    //   msgs.map(m => {
    //     const status = 'RECEIVED';
    //     store.write(() => {
    //       store.create("Messages", {...m, status}, true);
    //     });

    //     ids.push({_id: m._id, status: status});
    //   });
    //   send an array of message ids to mark as RECEIVED on remote db
    //   cb([]); //confirm action
    // });

    // check sent messge status
    checkSentMessageStatus(uID);
    // resend NEW messages that went offline
    resendOfflineMessages(uID);               
  });
}

const checkSentMessageStatus = (uID)=> {
  const messages = store.objects("Messages").filtered(`from = '${uID}' AND status = 'SENT'`);
  messages.map(msg => {
  // Save remote NEW message
    conn.send('realpub::message::status', {...msg, connId: conn.id } , (nextMsg, err)=> {
      //console.warn(nextMsg.status);
      if (!err) {
        if(msg.status !== nextMsg.status) {
          store.write(() => {
            // Update local with SENT ack from server
            store.create("Messages", nextMsg, true); // server ack
          });
        }
      }
    });
  });
}

const resendOfflineMessages = (uID)=> {
    const messages = store.objects("Messages").filtered(`from = '${uID}' AND status = 'NEW'`);
    messages.map(msg => {
      // Save remote NEW message
      conn.send('realpub::message', {...msg, connId: conn.id } , (nextMsg, err)=> {
        if (!err) {
          store.write(() => {
            // Update local with SENT ack from server
            store.create("Messages", nextMsg, true); // server ack
          });
        }
      });      
    });
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
    if (shouldAck) {
      ack({...msg, status})
    }
  });
}

const markAsRead = (msg) => {
  conn.send('realpub::message::read', {...msg, status: 'READ' } , (msgAck, err)=> {
    if (err) {
      console.warn('ERROR', err)
    } else {
      store.write(() => {
        // Update local with SENT ack from server
        store.create("Messages", msgAck, true); // server ack
      });
    }
  });
}

const countMessages = (id)=> {
  return store
          .objects("Messages")
          .filtered(`from = '${id}' AND status = 'RECEIVED'`)
          .length;
}

const getReceivedMessages = ()=> {
  return store
          .objects("Messages")
          .filtered(`status = 'RECEIVED'`)
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
  conn.send('realpub::message', {...msg, connId: conn.id } , (nextMsg, err)=> {
    if (!err) {
      store.write(() => {
        // Update local with SENT ack from server
        store.create("Messages", nextMsg, true); // server ack
      });
    }
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

const getChanges = ()=> {
  return store
    .objects("Messages"); 
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
  removeListener,
  resendOfflineMessages,
  checkSentMessageStatus,
  getReceivedMessages
}

const init = (uID)=> {
  const token = uID;
  const conn = connect(uID);
  return { ...realpub, conn, token };
}

export default (uID) => init(uID);