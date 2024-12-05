import { isMobile } from "../utils/isMobile.js";
import { lockPadding, unLockPadding } from "../utils/lockPadding.js";

// const wrapper = document.querySelector('.wrapper');
const partnershipPopup = document.querySelector('.popup#main');

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.hasAttribute('data-open-popup')) {
        e.preventDefault();
        const id = targetEl.getAttribute('data-id');
        const popup = document.querySelector(`.popup#${id}`);

        if (popup) {
            popup.classList.add('_open')
            // wrapper.classList.add('_overlay')

            lockPadding();
        }
    }

    if (targetEl.classList.contains('popup')) {
        targetEl.classList.remove('_open')
        closePopup(targetEl)
    }

    if (targetEl.classList.contains('popup__close') || targetEl.hasAttribute('data-close-popup') || (targetEl.classList.contains('_container') && targetEl.closest('.popup-msg'))) {
        const popup = targetEl.closest('.popup');
        closePopup(popup)
    }
})


function closePopup(popup) {
    popup.classList.remove('_open')

    if (popup.id != partnershipPopup.id && partnershipPopup.classList.contains('_open')) {
        //
    }
    else {
        // wrapper.classList.remove('_overlay')
        unLockPadding();
    }
}