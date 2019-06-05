'use strict';

var connection = new WebSocket('wss://neto-api.herokuapp.com/draw');
connection.binaryType = 'arraybuffer';

connection.addEventListener('message', (e) => {
    console.log('Получено сообщение от сервера');
    console.log(e.data.byteLength);
})

connection.addEventListener('open', (e) => {
    console.log('Вебсокет-соединение открыто');

    window.editor.addEventListener('update', (e) => {
        console.log('Сработало событие update');

        const canvas = e.canvas;
        const ctx = canvas.getContext('2d');
        const image = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
        const binary = Uint8Array.from(image.data);
        connection.send(binary.buffer);
    })

});



