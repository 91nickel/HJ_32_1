'use strict';
/*
function handleClick() {
  openMail();
}
const button = window.getElementById('open');
button.onclick = handleClick();
*/

/*
const button = document.getElementById('open');
button.onclick = () => openMail();
*/

function handleClick() {
  openMail();
}
const button = document.getElementById('open');
button.onclick = window.handleClick;