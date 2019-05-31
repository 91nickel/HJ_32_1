'use strict';
const canvas = document.getElementById('draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const pi = Math.PI;

let drawing = false;

let inPlace = false;
let mouseDown = false;

let x, y;
let radius = 100;
let radiusDirect = -1;
let color = 0;
let height = window.innerHeight;
let width = window.innerWidth;

function getColor(c) {
    return 'hsl(' + c + ',100%,50%)';
}

canvas.addEventListener('dblclick', clearCanvas)

canvas.addEventListener('mouseover', (e) => {
    inPlace = true;
    console.log(e);
})

canvas.addEventListener('mouseout', (e) => {
    inPlace = false;
    console.log(e);
})

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    console.log(e);
})

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    console.log(e);

    if (e.shiftKey) {
        color = color === 0 ? 359 : color - 1;
        console.log(color);
    } else {
        color = color === 359 ? 0 : color + 1;
        console.log(color);
    }

    if (radiusDirect === -1) {
        if (radius === 0) {
            radiusDirect = 1;
        }
    }
    if (radiusDirect === 1) {
        if (radius === 100) {
            radiusDirect = -1;
        }
    }
    radius += radiusDirect;
})

document.addEventListener('mousemove', (e) => {
    //console.log(e);
    x = e.clientX;
    y = e.clientY;
});

setInterval(drawFunction, 1);
setInterval(windowSize, 1);

function drawFunction() {
    drawing = inPlace && mouseDown ? true : false;
    if (!drawing) {
        return;
    }

    ctx.beginPath();
    ctx.fillStyle = getColor(color);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.arc(x, y, radius, 0, 2 * pi);
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function windowSize() {
    if (window.innerHeight !== height && !window.innerWidth !== width) {
        height = window.innerHeight;
        width = window.innerWidth;
        clearCanvas();
    }
}