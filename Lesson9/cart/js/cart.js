'use strict';
let colors;
let sizes;
let cart;
let sizeNow;
let colorNow;

getCart();
getColors();
getSizes();

setTimeout(remember, 2000);
setTimeout(getParamsFromStorage, 2500);

function getParamsFromStorage() {
    const colorInputs = document.querySelectorAll('#colorSwatch input');
    const sizeInputs = document.querySelectorAll('#sizeSwatch input');
    colorInputs.forEach((el) => {
        el.removeAttribute('checked');
        if (el.id === localStorage.color) {
            el.setAttribute('checked', true);
        }
    })
    sizeInputs.forEach((el) => {
        el.removeAttribute('checked');
        if (el.id === localStorage.size) {
            el.setAttribute('checked', true);
        }
    })

}

function remember() {
    const addToCartForm = document.querySelector('#AddToCartForm');
    addToCartForm.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'INPUT' && !target.disabled) {
            console.log('Сделан выбор чего - то');
            if (target.name === 'color') {
                console.log('Выбор цвета');
                localStorage.color = target.id;
            }
            if (target.name === 'size') {
                console.log('Выбор размера');
                localStorage.size = target.id;
            }
        }
    })
}

function getColors() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        colors = JSON.parse(xhr.response);
        console.log('Цвета');
        console.log(colors);
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

            if (!el.isAvailable) {
                input.setAttribute('disabled', true);
            }

            //console.log(input);

            const label = document.createElement('label');
            label.setAttribute('for', 'swatch-' + counter + '-' + el.code);
            label.style = 'border-color: ' + el.code + ';';

            //console.log(label);

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

            //console.log(child);

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'size';
            input.id = 'swatch-' + counter + '-' + el.type;
            input.value = el.type;
            if (!el.isAvailable) {
                input.setAttribute('disabled', true)
            }

            //console.log(input);

            const label = document.createElement('label');
            label.setAttribute('for', 'swatch-' + counter + '-' + el.type);
            label.innerText = el.title;

            //console.log(label);

            const img = document.createElement('img');
            if (!el.isAvailable) {
                img.classList.add('crossed-out');
            }
            if (!el.isAvailable) {
                img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
            }

            //console.log(img);

            label.appendChild(img);

            child.appendChild(input);
            child.appendChild(label);

            container.appendChild(child);
        })
    });

    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
    xhr.send();

}

function getCart() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
        cart = JSON.parse(xhr.response);
        console.log('Корзина');
        console.log(cart);

        const container = document.querySelector('#quick-cart');
        cart.forEach((el, i) => {
            const counter = i + 1;

            //<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-2721888517" style="opacity: 1;">
            const child = document.createElement('div');
            child.classList.add('quick-cart-product');
            child.classList.add('quick-cart-product-static');
            child.id = 'quick-cart-product-' + el.productId;
            child.style = 'opacity: 1;'

            //console.log(child);

            //<div class="quick-cart-product-wrap"></div>
            const div = document.createElement('div');
            div.classList.add('quick-cart-product-wrap');

            //console.log(div);

            //<img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York">
            const img = document.createElement('img');
            img.src = el.pic;
            img.title = el.title;

            //console.log(img);

            //<span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
            const innerSpan1 = document.createElement('span');
            innerSpan1.classList.add('s1');
            innerSpan1.style = 'background-color: #000; opacity: .5';
            innerSpan1.innerText = '$' + el.price + '.00';

            //console.log(innerSpan1);

            //<span class="s2"></span>
            const innerSpan2 = document.createElement('span');
            innerSpan2.classList.add('s2');

            //console.log(innerSpan2);

            //<span class="count hide fadeUp" id="quick-cart-product-count-2721888517">1</span>
            const span1 = document.createElement('span');
            span1.classList.add('count');
            span1.classList.add('hide');
            span1.classList.add('fadeUp');
            span1.id = 'quick-cart-product-count-' + el.productId;
            span1.innerText = el.quantity;

            //console.log(span1);

            //<span class="quick-cart-product-remove remove" data-id="2721888517"></span>
            const span2 = document.createElement('span');
            span2.classList.add('couquick-cart-product-remove');
            span2.classList.add('remove');
            span2.dataset.id = el.productId;

            //console.log(span2);

            div.appendChild(img);
            div.appendChild(innerSpan1);
            div.appendChild(innerSpan2);

            child.appendChild(div);
            child.appendChild(span1);
            child.appendChild(span2);

            container.appendChild(child);
        })
    });

    xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
    xhr.send();
}
// Корзина
/*
<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-2721888517" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York">
    <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-2721888517">1</span>
  <span class="quick-cart-product-remove remove" data-id="2721888517"></span>
</div>
*/

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