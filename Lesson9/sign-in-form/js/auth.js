'use strict';
const loginForm = document.querySelector('.sign-in-htm');
const loginButton = document.querySelector('.sign-in-htm input[type="submit"]');
const loginOutput = document.querySelector('.sign-in-htm output');
loginButton.addEventListener('click', sendLoginForm);

function sendLoginForm() {
    arguments[0].preventDefault();
    const loginFormData = new FormData(loginForm);
    for (const [k, v] of loginFormData) {
        console.log(k + ': ' + v);
    }
    const loginFormArray = Array.from(loginFormData);
    console.log(loginFormArray);

    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
        const response = JSON.parse(xhr.response);

        if (response.error) {
            loginOutput.innerText = response.message;
        } else {
            loginOutput.innerText = `Пользователь с логином ${loginFormArray[0][1]} успешно авторизован`;
        }
    });

    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.send(JSON.stringify(loginFormData));
}

const signUpForm = document.querySelector('.sign-up-htm');
const signUpButton = document.querySelector('.sign-up-htm input[type="submit"]');
const signUpOutput = document.querySelector('.sign-up-htm output');
console.log(signUpForm);
console.log(signUpButton);
console.log(signUpOutput);

signUpButton.addEventListener('click', sendSignUpForm);

function sendSignUpForm() {
    arguments[0].preventDefault();

    const signUpFormData = new FormData(signUpForm);
    for (const [k, v] of signUpFormData) {
        console.log(k + ': ' + v);
    }
    const signUpFormArray = Array.from(signUpFormData);
    console.log(signUpFormArray);

    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
        const response = JSON.parse(xhr.response);

        if (response.error) {
            signUpOutput.innerText = response.message;
            console.log(response);
        } else {
            signUpOutput.innerText = `Пользователь с логином ${signUpFormArray[3][1]} успешно зарегистрирован`;
        }
    });

    xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhr.send(JSON.stringify(signUpFormData));
}