const doneElements = document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('click', doneUndone);
});

function doneUndone() {
    const e = arguments[0];
    console.log('Событие', e)

    const element = e.target.parentElement; //label
    console.log('Элемент', element);
    console.log()

    const container = element.parentElement;
    console.log('Контейнер', container);

    const sibling = container.previousElementSibling.tagName === 'SECTION' ? container.previousElementSibling : container.nextElementSibling;
    console.log('Сосед', sibling);

    console.log('checked', element.children[0].hasAttribute('checked'));

    if (element.children[0].hasAttribute('checked')) {
        element.children[0].removeAttribute("checked");
    } else {
        element.children[0].setAttribute("checked", "");
    }
    sibling.appendChild(element);
}