document.querySelector('.slides .slide').classList.add('slide-current');
const sliders = document.querySelectorAll('.slides');

console.log(sliders);
Array.from(sliders).forEach(item => Slider(item));


function Slider(container) {
    console.log(container);
    const next = document.querySelector('[data-action="next"]');
    const prev = document.querySelector('[data-action="prev"]');
    const first = document.querySelector('[data-action="first"]');
    const last = document.querySelector('[data-action="last"]');
    selectPosition();

    function moveRight() {
        const currentSlide = container.querySelector('.slide-current');
        const activatedSlide = currentSlide.nextElementSibling;
        currentSlide.classList.remove('slide-current');
        activatedSlide.classList.add('slide-current');
        selectPosition();
    }

    function moveLeft() {
        const currentSlide = container.querySelector('.slide-current');
        const activatedSlide = currentSlide.previousElementSibling;
        currentSlide.classList.remove('slide-current');
        activatedSlide.classList.add('slide-current');
        selectPosition();
    }

    function moveStart() {
        container.querySelector('.slide-current').classList.remove('slide-current');
        document.querySelector('.slide').classList.add('slide-current');
        selectPosition();
    }

    function moveEnd() {
        container.querySelector('.slide-current').classList.remove('slide-current');
        Array.from(container.querySelectorAll('.slide')).reverse()[0].classList.add('slide-current');
        selectPosition();
    }

    function selectPosition() {
        const container = Array.from(document.querySelectorAll('.slide'));
        const currentSlide = document.querySelector('.slide-current');

        let result = container.findIndex(el => {
            return el === currentSlide;
        })

        const min = 0;
        const max = container.length - 1;

        next.addEventListener('click', moveRight);
        next.classList.remove('disabled');
        prev.addEventListener('click', moveLeft);
        prev.classList.remove('disabled');
        first.addEventListener('click', moveStart);
        first.classList.remove('disabled');
        last.addEventListener('click', moveEnd);
        last.classList.remove('disabled');

        if (result === min) {
            next.addEventListener('click', moveRight);
            next.classList.remove('disabled');
            prev.removeEventListener('click', moveLeft);
            prev.classList.add('disabled');
            first.removeEventListener('click', moveStart);
            first.classList.add('disabled');
            last.addEventListener('click', moveEnd);
            last.classList.remove('disabled');

        }
        if (result === max) {
            next.removeEventListener('click', moveRight);
            next.classList.add('disabled');
            prev.addEventListener('click', moveLeft);
            prev.classList.remove('disabled');
            first.addEventListener('click', moveStart);
            first.classList.remove('disabled');
            last.removeEventListener('click', moveEnd);
            last.classList.add('disabled');
        }
    }
}