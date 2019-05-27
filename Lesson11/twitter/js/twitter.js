const outputs = document.querySelectorAll('output');
const bg = document.querySelector('img.bg');
const avatar = document.querySelector('img.avatar');
const user = document.querySelector('h3');
const desc = document.querySelector('.desc').children[1];

function callback(data) {
    console.log(data);
    console.log(outputs);
    outputs[0].value = data.tweets;
    outputs[1].value = data.followers;
    outputs[2].value = data.following;
    avatar.src = data.pic;
    bg.src = data.wallpaper;
    user.innerText = data.username;
    desc.innerText = data.description;
}