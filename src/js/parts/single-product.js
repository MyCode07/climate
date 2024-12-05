const scrollBtn = document.querySelector('.single-product ._more');
const scrollSection = document.querySelector('.product-tabs');
const header = document.querySelector('.header');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        const top = scrollSection.offsetTop - header.getBoundingClientRect().height - 20;
        window.scrollTo(0, top)
    })
}