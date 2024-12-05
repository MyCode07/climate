import { lockPadding, unLockPadding } from '../utils/lockPadding.js';

const openCartFormBtn = document.querySelector('.go-to-order ._btn');
const closeCartFormBtn = document.querySelector('.cart-order__close');
const carFormPopup = document.querySelector('.cart-order');

if (openCartFormBtn && window.innerWidth <= 1024) {
    openCartFormBtn.addEventListener('click', () => {
        carFormPopup.classList.add('_open')
        lockPadding();
    })

    closeCartFormBtn.addEventListener('click', () => {
        carFormPopup.classList.remove('_open')
        unLockPadding();
    })
}