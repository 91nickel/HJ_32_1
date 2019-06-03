'use strict';

function showComments(list) {
  console.log(list);
  const commentsContainer = document.querySelector('.comments');
  list.forEach((el) => {
    console.log(createComment(el));
    commentsContainer.appendChild(createComment(el));
  })

  //const comments = list.map(createComment).join('');
  //commentsContainer.innerHTML += comments;
  //commentsContainer.innerText += comments;

}

function createComment(comment) {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('comment-wrap');

  const firstDiv = document.createElement('div');
  firstDiv.classList.add('photo');
  firstDiv.title = comment.author.name;

  const firstDivChild = document.createElement('div');
  firstDivChild.classList.add('avatar');
  firstDivChild.style = `background-image: url('${comment.author.pic}')`;
  firstDiv.appendChild(firstDivChild);

  const secondDiv = document.createElement('div');
  secondDiv.classList.add('comment-block');

  const p = document.createElement('p');
  p.classList.add('comment-text');
  p.innerText = comment.text.split('\n').join('<br>');
  secondDiv.appendChild(p);

  const secondDivChild = document.createElement('div');
  secondDivChild.classList.add('bottom-comment');
  secondDiv.appendChild(secondDivChild);

  const secondDivChildChild = document.createElement('div');
  secondDivChildChild.classList.add('comment-date');
  secondDivChildChild.innerText = new Date(comment.date).toLocaleString('ru-Ru');
  secondDivChild.appendChild(secondDivChildChild);

  const ul = document.createElement('ul');
  ul.classList.add('comment-actions');
  secondDivChild.appendChild(ul);

  const liComplain = document.createElement('li');
  liComplain.classList.add('complain');
  liComplain.innerText = 'Пожаловаться';
  ul.appendChild(liComplain);

  const liReply = document.createElement('li');
  liReply.classList.add('reply');
  liReply.innerText = 'Ответить';
  ul.appendChild(liReply);

  mainContainer.appendChild(firstDiv);
  mainContainer.appendChild(secondDiv);
  return mainContainer;
}

/*
function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}
*/

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
