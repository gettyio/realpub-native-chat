window.navigator.userAgent = "react-native";
import io from "socket.io-client";

const __Realpub = {
  active: false,
  socket: null,
  nsSocket: null,
  host: "https://realpub-api.getty.io/"
};
function init(API_KEY) {
  return new Promise(resolve => {
    if (__Realpub.active) {
      resolve({ on, emit, disconnect, getConnectedSockets });
    } else {
      // set instance of Realpub
      __Realpub.socket = io("https://realpub-api.getty.io/", {
        transports: ["websocket"],
        jsonp: false
      });
      __Realpub.active = true;

      __Realpub.socket.on("connect", () => {
        __Realpub.socket.on("not::found", data => {
          console.warn("Not found", data);
        });

        __Realpub.socket.on("connecting", data => {
          console.warn("The client is in process of connecting.", data);
        });

        __Realpub.socket.on("reconnect", data => {
          console.warn("The reconnection to server was successful.", data);
        });

        __Realpub.socket.on("reconnecting", data => {
          console.warn("The client is in process of reconnecting.", data);
        });

        __Realpub.socket.on("reconnect_failed", data => {
          console.warn("The client reconnection attempt fails.", data);
        });

        __Realpub.socket.on("connect_failed", data => {
          console.warn("The connection to server fails.", data);
        });

        __Realpub.socket.on("disconnect", data => {
          __Realpub.active = false;
          console.warn("User Disconnected.", data);
        });

        __Realpub.socket.emit("new::connection", {
          apiKey: API_KEY,
          applicationhost: "@@REACT_NATIVE"
        });

        __Realpub.socket.on("namespace::created", data => {
          const namespace = `${__Realpub.host}${API_KEY}`;
          __Realpub.nsSocket = io.connect(namespace);
          resolve({ on, emit, disconnect, getConnectedSockets });
        });
      });
    }
  });
}

/**
 * @name disconnect
 * @description Disconnect the client socket instance
 */
function disconnect() {
  __Realpub.nsSocket.disconnect();
}

/**
 * @name kill
 * @description Disconnect the global socket instance
 */
function kill() {
  __Realpub.socket.disconnect();
}

function on(event, callback) {
  __Realpub.nsSocket.on(event, callback);
}

function emit(event, ...args) {
  __Realpub.socket.emit("emit::event", event, ...args);
}

function send(event, ...args) {
  __Realpub.socket.emit(event, ...args);
}

/**
 * @name getConnectedSockets
 * @description get all connected sockets in the namespace
 */
function getConnectedSockets() {
  __Realpub.socket.emit("show::connected::sockets");
}

export default { init, send, on, kill, emit, disconnect, getConnectedSockets };
