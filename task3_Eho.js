
const wsUri = "wss://echo-ws-service.herokuapp.com";

const chat = document.getElementById("chat");

const btnSent = document.querySelector('.btn-sent');
const btnGeo = document.querySelector('.btn-geo');

let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    chat.appendChild(pre);
  }
  
    websocket = new WebSocket(wsUri);

    btnSent.addEventListener('click', () => {
      const message = document.querySelector('.enter').value;
      writeToScreen("Отправитель: " + message);
      websocket.send(message);
    });


   function pageLoaded() {
    websocket.onopen = function(evt) {
      writeToScreen("CONNECTED");
    };

    websocket.onclose = function(evt) {
      writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
      writeToScreen(
        '<span style="color: blue;">Сервер: ' + evt.data+'</span>'
      );
    };
    websocket.onerror = function(evt) {
      writeToScreen(
        '<span style="color: red;">ERROR:</span> ' + evt.data
      );
    };
 
}
  document.addEventListener("DOMContentLoaded", pageLoaded);