document.getElementById('loader').classList.toggle('hidden');
var result;
const request = new XMLHttpRequest();
request.addEventListener('load', () => {
    document.getElementById('loader').classList.toggle('hidden');
    result = JSON.parse(request.responseText);
    console.log(result);
    let from = document.getElementById('from').innerHTML = new Array(result.length).fill(1).map((el, i) => {
        return '<option data-value="' + result[i].value + '" data-code="' + result[i].code + '">' + result[i]
            .title + '</option>';
    }).join('');
    document.getElementById('to').innerHTML = new Array(result.length).fill(1).map((el, i) => {
        return '<option data-value="' + result[i].value + '" data-code="' + result[i].code + '">' + result[i]
            .title + '</option>';
    }).join('');
    getOutput();
    document.getElementById('content').classList.remove('hidden');
    document.querySelector('input').addEventListener('input', getOutput);
    document.querySelectorAll('select').forEach((el) => {
        el.addEventListener('input', getOutput);
    });
});
request.addEventListener('load', () => {});
request.open('GET', 'https://neto-api.herokuapp.com/currency');
request.send();

function getOutput() {
    let count = document.getElementById('source').value;
    let from = result.find((el) => {
        if (el.title === document.querySelector('#from').value) {
            return el;
        }
    }).value;
    let to = result.find((el) => {
        if (el.title === document.querySelector('#to').value) {
            return el;
        }
    }).value;

    document.getElementById('result').innerHTML = Math.round(count * from / to * 100) / 100;

    console.log(count);
    console.log(from);
    console.log(to);
}