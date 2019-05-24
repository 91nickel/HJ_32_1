'use strict';
const url = 'wss://neto-api.herokuapp.com/chat';
const messageTo = document.querySelector('.message-personal');
const messageFrom = document.querySelectorAll('.message')[1];
const messageLoad = document.querySelector('.message.loading');
const messageStat = document.querySelector('.message-status');
const messageContainer = document.querySelector('.messages-content');
const loader = messageLoad.cloneNode(true);
const h2 = document.querySelector('h2');
const button = document.querySelector('button');
const form = document.querySelector('form');
const connection = new WebSocket(url);

connection.addEventListener('open', event => {
  console.log(`Соединение открыто`);
  h2.innerText = h2.dataset.online;
  button.removeAttribute('disabled');
  const att = messageFrom.cloneNode(true);
  att.children[1].innerText = 'Пользователь ' + document.querySelector('h1').innerText + ' появился в сети';
  att.children[2].innerText = getTime();
  messageContainer.appendChild(att);

  button.addEventListener('click', sendMessage);

  function sendMessage(e) {
    e.preventDefault();
    const message = form.children[0].value;
    console.log('Отправка сообщения', message);
    element = messageTo.cloneNode(true);
    element.children[0].innerText = message;
    element.children[1].innerText = getTime();
    messageContainer.appendChild(element);
    connection.send(message);
    form.children[0].value = '';
  }

});
connection.addEventListener('message', event => {
  console.log('Получено сообщение');
  console.log(event);
  if (event.data === '...') {
    messageContainer.appendChild(loader);
    return;
  }
  try {
    messageContainer.removeChild(loader);
  } catch (e) {
    console.log(e.message);
  }

  const element = messageFrom.cloneNode(true);
  element.querySelector('span').innerText = event.data;
  element.querySelector('div').innerText = getTime();
  console.log(element);
  messageContainer.appendChild(element);
});
connection.addEventListener('close', event => {
  console.log(`Соединение закрыто`);
  h2.innerText = h2.dataset.offline;
  button.setAttribute('disabled', true);

  const att = messageFrom.cloneNode(true);
  att.children[1].innerText = 'Пользователь ' + document.querySelector('h1').innerText + ' не в сети';
  att.children[2].innerText = getTime();
  messageContainer.appendChild(att);

});

function getTime() {
  let time = new Date;
  console.log(time.getHours().toString());
  let hours = time.getHours().toString().length === 1 ? '0' + time.getHours() : time.getHours();
  let minutes = time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes();
  time = hours + ':' + minutes;
  console.log(time);
  return time;
}