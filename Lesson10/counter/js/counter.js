'use strict';
const url = 'wss://neto-api.herokuapp.com/counter';
const connection = new WebSocket(url);
const h1 = document.querySelector('div h1');
const output = document.querySelector('.errors');

connection.addEventListener('open', event => {
    console.log(`Соединение открыто`);
});
connection.addEventListener('message', event => {
    console.log('Получено сообщение');
    console.log(event.data);
    h1.innerText = 'Открыто соединений: ' + JSON.parse(event.data).connections;
    output.value = JSON.parse(event.data).errors;
})
window.addEventListener('beforeunload', () => {
    console.log('Закрытие соединения');
    connection.close(1000, 'Connection closed');
})