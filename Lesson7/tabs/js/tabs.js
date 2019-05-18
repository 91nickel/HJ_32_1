const nav = document.querySelector('.tabs-nav');
const articles = Array.from(document.querySelector('.tabs-content').children);
nav.innerHTML = '';

articles.forEach((el) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add(el.dataset.tabIcon);
    a.classList.add('fa');
    a.innerText = el.dataset.tabTitle;
    li.appendChild(a);
    nav.appendChild(li);
})
nav.children[0].classList.add('ui-tabs-active');
articles.forEach((el, i) => {
    if (i === 0) {
        return;
    }
    el.classList.add('hidden');
})

const newNav = document.querySelectorAll('.tabs-nav li').forEach((el) => {
    el.addEventListener('click', selectArticle);
});

function selectArticle() {
    console.log(arguments[0].target.parentElement);
    const target = arguments[0].target.parentElement;
    const navElements = document.querySelectorAll('.tabs-nav li');
    const articlePos = Array.from(navElements).findIndex((el) => {
        return el === target;
    });
    clearNav(articlePos);
    clearArticles(articlePos);
}

function clearNav(pos) {
    const tabs = document.querySelectorAll('.tabs-nav li');
    tabs.forEach((el) => {
        el.classList.remove('ui-tabs-active');
    });
    console.log(tabs);
    tabs[pos].classList.add('ui-tabs-active');
}

function clearArticles(pos) {
    const art = document.querySelectorAll('.tabs-content > *');
    art.forEach((el, i) => {
        if (i === pos) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    })
    console.log(art);
}

//console.log(articles);
//console.log(nav);