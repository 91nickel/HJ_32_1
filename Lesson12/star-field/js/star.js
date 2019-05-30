const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pi = Math.PI;

const minX = 0;
const maxX = canvas.clientWidth;

const minY = 0;
const maxY = canvas.clientHeight;

const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

const count = Math.round(randomValue(200, 400));
console.log(count);

createStars();

document.addEventListener('click', createStars);

function randomValue(min, max) {
    return Math.round((min + (max - min) * Math.random()) * 100) / 100;
}


function createStars() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, maxX, maxY);
    ctx.closePath();
    
    for (let i = 0; i < count; i++) {
        const x = randomValue(minX, maxX);
        const y = randomValue(minY, maxY);
        const radius = randomValue(0, 1.1);
        const alpha = randomValue(0.8, 1);
        const color = colors[Math.round(randomValue(0, colors.length - 1))];

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * pi);
        ctx.fillStyle = color;

        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.closePath();

        console.log(`Создан объект #${i} x=${x} y=${y} r=${radius} alpha=${alpha} color=${color}`);
    }
}