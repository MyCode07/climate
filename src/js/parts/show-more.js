const btnsMore = document.querySelectorAll('.show-hidden-acordeon');

if (btnsMore.length) {
    btnsMore.forEach(btn => {
        const acordeon = btn.nextElementSibling

        if (acordeon) {
            btn.addEventListener('click', () => {
                btn.classList.toggle('_active')

                if (btn.classList.contains('_active')) {
                    btn.textContent = btn.dataset.textHide
                }
                else {
                    btn.textContent = btn.dataset.textShow
                }

                acordeon.classList.toggle('_active')
            })
        }
    })
}