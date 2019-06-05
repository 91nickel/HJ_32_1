'use strict';

var connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
connection.addEventListener('open', (e) => {
    //console.log('Вебсокет-соединение открыто');

    connection.addEventListener('message', (e) => {
        //console.log(e);
        selectCard(type.ws, +e.data);
    })

});

const type = {
    p: "pooling",
    lp: "long-pooling",
    ws: "websocket"
}

function selectCard(type, number) {
    const req = '.' + type + ' div';
    const nodes = document.querySelectorAll(req);
    
    clearCards(nodes);
    nodes[number - 1].classList.toggle('flip-it');
}

function clearCards(nodes) {
    nodes.forEach((el)=>{
        el.classList.remove('flip-it');
    })
}