import store from './store';

export const ack = (conn, msg)=> {

}

export const save = (conn, msg)=> {
  store.write(() => {
    store.create("Messages", msg, true);
  });
  conn.send('realpub::message::received', msg, (recMsg, error)=> {
    store.write(() => {
      store.create("Messages", recMsg, true);
    });    
  })
}

export const update = (conn, msg)=> {
  store.write(() => {
    store.create("Messages", msg, true);
  });
}