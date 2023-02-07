
const wsUri = "wss://echo-ws-service.herokuapp.com";

const enter = document.querySelector('.enter')
const chat = document.getElementById("chat");

const btnSent = document.querySelector('.btn-sent');
const btnGeo = document.querySelector('.btn-geo');

let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordwrap = "break-word";
    pre.innerHTML = message;
    chat.appendChild(pre);
  }
  
  btnSent.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
      writeToScreen("CONNECTED");
    };
    websocket.onclose = function(evt) {
      writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
      writeToScreen(
        '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
      );
    };
    websocket.onerror = function(evt) {
      writeToScreen(
        '<span style="color: red;">ERROR:</span> ' + evt.data
      );
    };
  });