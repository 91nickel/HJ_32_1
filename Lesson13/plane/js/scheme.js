'use strict'
const acSelect = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapTitle = document.querySelector('#seatMapTitle');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult ');
const totalHalf = document.querySelector('#totalHalf');
const seatMapDiv = document.querySelector('#seatMapDiv');

getData();
acSelect.addEventListener('change', getData);

function getData() {
    const link = 'https://neto-api.herokuapp.com/plane/' + acSelect.value;

    fetch(link)
        .then(res => res.json())
        .then(refresh);
}

function refresh(el) {
    seatMapTitle.innerText = `${el.title} ${el.passengers} пассажиров`;
    seatMapDiv.innerHTML = '';
    console.log(el);
    createScheme(el);
    getStat();
}

function createScheme(data) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F']
    const rows = data.scheme.length;
    let scheme = new Array(rows).fill(createEl('div', ['row', 'seating-row', 'text-center'])).map((container, i) => {

        const rowNumber = createEl('div', ['col-xs-1', 'row-number']);
        const rowNumberH2 = document.createElement('h2');
        rowNumberH2.innerText = i + 1;
        rowNumber.appendChild(rowNumberH2);
        container.appendChild(rowNumber);


        for (let i = 0; i < 2; i++) {
            let half = createEl('div', ['col-xs-5']);

            for (let j = 0; j < 3; j++) {
                let seat = createEl('div', ['col-xs-4', 'seat']);
                seat.addEventListener('click', seatStatus);
                let span = createEl('span', ['seat-label']);
                if (i === 0) {
                    span.innerText = letters[j];
                } else {
                    span.innerText = letters[2 + j];
                }

                seat.appendChild(span);
                half.appendChild(seat);
            }

            container.appendChild(half);
        }

        return container;

    }).forEach((el) => {
        seatMapDiv.appendChild(el);
    })
}

function createEl(name = 'div', classes = []) {
    const result = document.createElement(name);
    classes.forEach((el) => {
        result.classList.add(el);
    })
    return result;
}

function seatStatus(event) {
    const target = event.currentTarget;

    if (target.classList.contains('adult') || target.classList.contains('half')) {
        target.classList.remove('adult');
        target.classList.remove('half');
        getStat();
        return;
    }

    if (event.altKey) {
        target.classList.add('half');
        target.classList.remove('adult');
        getStat();
        return;
    }

    target.classList.add('adult');
    target.classList.remove('half');
    getStat();
}

function getStat() {
    const adult = document.querySelectorAll('.adult');
    const half = document.querySelectorAll('.half');

    console.log(adult);
    console.log(half);

    totalAdult.innerText = adult.length;
    totalHalf.innerText = half.length;
    totalPax.innerText = adult.length + half.length;
}