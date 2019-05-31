var zip;
const inputs = document.querySelectorAll('input');
const textboxes = document.querySelector('textarea');
const outputs = document.querySelectorAll('output');
const submit = document.querySelector('.contentform .button-contact');
const change = document.querySelector('#output .button-contact')
activateButton();

submit.addEventListener('click', showOutput);
//submit.addEventListener('click', showForm);

change.addEventListener('click', showForm);

inputs.forEach((el) => {
    el.addEventListener('input', activateButton);
    if (el.name === 'zip') {
        zip = el;
        el.addEventListener('change', checkZip)
    }
})

textboxes.addEventListener('input', activateButton);

function checkZip() {
    if (!/^\d{6}$/.test(zip.value)) {
        zip.placeholder = "Введите корректный индекс";
        zip.value = '';
    };
    console.log(!/^\d{6}$/.test(zip.value));
}

function showOutput() {
    arguments[0].preventDefault();
    document.querySelector('h1').classList.toggle('hidden');
    document.querySelector('.contentform').classList.toggle('hidden');
    document.querySelector('#output').classList.toggle('hidden');

    const outputs = document.querySelectorAll('output');
    outputs.forEach((el) => {
        el.innerHTML = document.getElementsByName(el.id)[0].value;
    })
    document.getElementById('message').innerHTML = document.getElementsByName('message')[0].value;
}

function showForm() {
    arguments[0].preventDefault();
    document.querySelector('h1').classList.toggle('hidden');
    document.querySelector('.contentform').classList.toggle('hidden');
    document.querySelector('#output').classList.toggle('hidden');
}

function activateButton() {
    let count = 0;
    inputs.forEach((el) => {
        if (el.value === '') {
            count++;
        };
    });
    if (count === 0 && textboxes.value !== '') {
        document.querySelector('.button-contact').removeAttribute('disabled');
    }
};
for (let i = 0; i < 10; i++) {
    console.log(inputs[i]);
    console.log(outputs[i]);
}