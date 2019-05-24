'use strict';

const url = 'wss://neto-api.herokuapp.com/mouse';

const connection = new WebSocket(url);

connection.addEventListener('open', event => {
    console.log(`Соединение открыто`);
    showBubbles(connection);
    document.addEventListener('click', e => {
        console.log(e);
        const click = new Object();
        click.x = e.clientX;
        click.y = e.clientY;
        console.log(click);
        connection.send(JSON.stringify(click));
    })
})