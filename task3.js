
// const wsUri = "wss://echo-ws-service.herokuapp.com";

// const chat = document.getElementById("chat");

// const btnSent = document.querySelector('.btn-sent');
// //const btnGeo = document.querySelector('.btn-geo');

// let websocket;

// function writeToScreen(message) {
//     let pre = document.createElement("p");
//     pre.style.wordWrap = "break-word";
//     pre.innerHTML = message;
//     chat.appendChild(pre);
//   }
  
//     websocket = new WebSocket(wsUri);

//     btnSent.addEventListener('click', () => {
//       const message = document.querySelector('.enter').value;
//       writeToScreen("Отправитель: " + message);
//       websocket.send(message);
//     });


//    function pageLoaded() {
//       let btn = document.getElementById('btn-geo');
//   }


//     websocket.onopen = function(evt) {
//       writeToScreen("CONNECTED");
//     };

//     websocket.onclose = function(evt) {
//       writeToScreen("DISCONNECTED");
//     };
//     websocket.onmessage = function(evt) {
//       writeToScreen(
//         '<span style="color: blue;">Сервер: ' + evt.data+'</span>'
//       );
//     };
//     websocket.onerror = function(evt) {
//       writeToScreen(
//         '<span style="color: red;">ERROR:</span> ' + evt.data
//       );
//     };
 

//   document.addEventListener("DOMContentLoaded", pageLoaded);



  const wsUri = 'wss://echo-ws-service.herokuapp.com';

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector(".input");
  const btnSent = document.querySelector(".btn-sent");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  btnSent.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);