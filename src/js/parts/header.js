export const stickyHeader = () => {
    const header = document.querySelector('header');
    if (!header) return

    const headerheigth = header.getBoundingClientRect().height / 3;

    const sticky = () => {
        if (window.scrollY > headerheigth) {
            header.classList.add('_sticky')
        }
        else {
            if (!header.classList.contains('_sticky-static')) {
                header.classList.remove('_sticky')
            }
        }
    }

    sticky();
    window.addEventListener('scroll', sticky);
}