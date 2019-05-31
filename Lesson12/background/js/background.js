'use strict';
const canvas = document.getElementById('wall');
const maxX = canvas.width;
const maxY = canvas.height;
const ctx = canvas.getContext('2d');
const pi = Math.PI;
const count = Math.round(randomValue(1, 2));

const crosses = [];

class Cross {
    constructor() {
        this.xStart = randomValue(0, maxX);
        this.yStart = randomValue(0, maxY);
        this.rStart = pi / randomValue(1, 16);
        this.x = this.xStart;
        this.y = this.yStart;
        this.r = this.rStart;
        this.size = 20 * randomValue(0.1, 0.6) / 2;
        this.weight = 5 * randomValue(0.1, 0.6) / 2;
        this.rSpeed = randomValue(0, 0.4) - 0.2;
    }
    get xNext() {
        this.x = this.x + (Math.sin((50 + this.x + (Date.now() / 10)) / 100) * 3);
        if (this.x > maxX || this.x < 0) {
            this.x = this.xStart;
        }
        return this.x;
    }
    get yNext() {
        this.y = this.y + (Math.sin((45 + this.y + (Date.now() / 10)) / 100) * 4);
        if (this.y > maxX || this.y < 0) {
            this.y = this.yStart;
        }
        return this.y;
    }
    get rNext() {
        this.r = this.r + this.rSpeed;
        return this.r;
    }
}

function randomValue(min, max) {
    return Math.round((min + (max - min) * Math.random()) * 100) / 100;
}

for (let i = 0; i < count; i++) {
    crosses.push(new Cross);
}

function updateCrosses(){

    clearCanvas();

    crosses.forEach((el) => {
        const x = el.xNext;
        const y = el.yNext;
        const size = el.size;
        const r = el.r
    
        ctx.beginPath();
        ctx.rotate(r);
        ctx.strokeStyle = 'white';
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + size);
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, el.y);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - el.size);
        ctx.stroke();
        ctx.closePath();
        console.log(el);
    })
}

function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = '#04BBD3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

setInterval(updateCrosses, 20);