'use strict';
let colors;
let sizes;
let cart;

getCart();
getColors();
getSizes();

function getColors() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        colors = JSON.parse(xhr.response);
        //console.log('Цвета');
        //console.log(colors);
        const container = document.querySelector('#colorSwatch');
        colors.forEach((el, i) => {
            const counter = i + 1;

            const child = document.createElement('div');
            child.dataset.value = el.code;
            child.classList.add('swatch-element');
            child.classList.add('color');
            child.classList.add(el.code);
            if (el.isAvailable) {
                child.classList.add('available');
            } else {
                child.classList.add('soldout');
            }

            //console.log(child);

            const div = document.createElement('div');
            div.classList.add('tooltip');
            div.innerText = el.title;

            //console.log(div);

            const input = document.createElement('input');
            input.setAttribute('quickbeam', 'color');
            input.type = 'radio';
            input.name = 'color';
            input.id = 'swatch-' + counter + '-' + el.code;
            input.value = el.code;

            //console.log(input);

            const label = document.createElement('label');
            label.setAttribute('for', 'swatch-' + counter + '-' + el.code);
            label.style = 'border-color: ' + el.code + ';';

            console.log(label);

            const span = document.createElement('span');
            span.style = 'background-color: ' + el.code + ';';

            //console.log(span);

            const img = document.createElement('img');
            if (!el.isAvailable) {
                img.classList.add('crossed-out');
            }
            if (!el.isAvailable) {
                img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
            }

            //console.log(img);
            
            label.appendChild(span);
            label.appendChild(img);

            child.appendChild(div);
            child.appendChild(input);
            child.appendChild(label);

            container.appendChild(child);
        })
    });

    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
    xhr.send();
}

function getSizes() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        sizes = JSON.parse(xhr.response);
        console.log('Размеры');
        console.log(sizes);

        const container = document.querySelector('#sizeSwatch');
        sizes.forEach((el, i) => {
            const counter = i + 1;

            const child = document.createElement('div');
            child.dataset.value = el.type;
            child.classList.add('swatch-element');
            child.classList.add('plain');
            child.classList.add(el.type);
            if (el.isAvailable) {
                child.classList.add('available');
            } else {
                child.classList.add('soldout');
            }

            console.log(child);

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'size';
            input.id = 'swatch-' + counter + '-' + el.type;
            input.value = el.type;
            if (!el.isAvailable){
                input.setAttribute('disabled', true)
            }

            console.log(input);

            const label = document.createElement('label');
            label.setAttribute('for', 'swatch-' + counter + '-' + el.type);
            label.innerText = el.title;

            console.log(label);

            const img = document.createElement('img');
            if (!el.isAvailable) {
                img.classList.add('crossed-out');
            }
            if (!el.isAvailable) {
                img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
            }

            console.log(img);

            label.appendChild(img);

            child.appendChild(input);
            child.appendChild(label);

            container.appendChild(child);
        })
    });

    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
    xhr.send();

}
// Размеры

/*
<div data-value="s" class="swatch-element plain s soldout">
  <input id="swatch-0-s" type="radio" name="size" value="s" disabled>
  <label for="swatch-0-s">
    S
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>
*/

// Цвета
/*
<div data-value="red" class="swatch-element color red available">
  <div class="tooltip">Красный</div>
  <input quickbeam="color" id="swatch-1-red" type="radio" name="color" value="red" checked>
  <label for="swatch-1-red" style="border-color: red;">
    <span style="background-color: red;"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>
*/


function getCart() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        cart = JSON.parse(xhr.response);
        console.log('Корзина');
        console.log(cart);
    });

    xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
    xhr.send();
}