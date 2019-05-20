'use strict';
updateAddToCart();
document.querySelector('.show-more').addEventListener('click', updateAddToCart)

function updateAddToCart() {
    const cards = document.querySelectorAll('figure');
    cards.forEach((el) => {
        el.addEventListener('click', callAddToCart)
    })
}

function callAddToCart(event) {
    if (event.target.classList.contains('add-to-cart')) {
        event.preventDefault();
        let element = event.target;
        let title = element.dataset.title;
        let price = element.dataset.price;
        addToCart({
            'title': title,
            'price': price
        });
    }
}