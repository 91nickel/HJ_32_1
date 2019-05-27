'use strict';
var counter = 0;
let profile, tech;
const container = document.querySelector('.content');
const name = container.querySelector('h1');
const desc = container.querySelector('p');
const avatar = container.querySelector('img');
const pos = container.querySelector('h3');
const techBlock = container.querySelector('.badgescard');

function callback(data) {
  counter++;
  if (counter === 1) {
    profile = data;
    const newScript = document.createElement('script');
    newScript.src = 'https://neto-api.herokuapp.com/profile/' + data.id + '/technologies';
    document.querySelector('body').appendChild(newScript);
  }
  if (counter === 2) {
    tech = data;
    name.innerText = profile.name;
    desc.innerText = profile.description;
    avatar.src = profile.pic;
    pos.innerText = profile.position;

    tech.forEach(el => {
      //<span class="devicons devicons-django"></span>
      let element = document.createElement('span');
      element.classList.add('devicons');

      let techClass = 'devicons-' + el;

      element.classList.add(techClass);
      //element.dataset.following = el;
      //element.innerText = el;
      techBlock.appendChild(element);
    })
    container.style = 'display: inherit;'
  }
  console.log(data);
}