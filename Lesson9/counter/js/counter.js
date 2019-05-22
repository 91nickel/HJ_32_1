'use strict';

const output = document.querySelector('#counter');
const container = document.querySelector('.wrap-btns');
let counter = +document.getElementById('counter').innerHTML;
setOutput();
container.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'increment':
            counter++;
            break;
        case 'decrement':
            counter--;
            break;
        case 'reset':
            counter = 0;
            break;
    }
    localStorage.setItem('counter', counter);
    setOutput();
})

function setOutput() {
    counter = localStorage.getItem('counter') === undefined ? 0 : localStorage.getItem('counter');
    output.innerHTML = counter;
}