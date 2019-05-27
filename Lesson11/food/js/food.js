'use strict';
let food, rate, users;
let counter = 0;
const body = document.querySelector('body');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const cover = document.querySelector('[data-pic]');

const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumer = document.querySelector('[data-consumers]');

function callback(data) {
    counter++;
    if (counter === 1) {
        food = data;
        const rateScript = document.createElement('script');
        rateScript.src = 'https://neto-api.herokuapp.com/food/42/rating';
        body.appendChild(rateScript);
    }
    if (counter === 2) {
        rate = data;
        const usersScript = document.createElement('script');
        usersScript.src = 'https://neto-api.herokuapp.com/food/42/consumers';
        body.appendChild(usersScript);
    }
    if (counter === 3) {
        users = data;
        cover.style = 'background-image: url(' + food.pic + ');';
        title.innerText = food.title;
        ingredients.innerText = food.ingredients.join(', ');
        rating.innerText = Math.round(rate.rating * 100) / 100;
        star.style = 'width: ' + rating.innerText * 10 + '%;';
        votes.innerHTML = '(' + rate.votes + ' оценок)';

        users.consumers.forEach((el, i, arr) => {
            const element = document.createElement('img');
            element.src = el.pic;
            el.title = el.name;
            consumer.appendChild(element);
            if (i === arr.length - 1) {
                const total = document.createElement('span');
                let count = users.total - arr.length;
                total.innerText = '(+' + count + ')';
                consumer.appendChild(total);
            }
        })

    }
    console.log(data);
}