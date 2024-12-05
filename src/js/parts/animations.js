
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { TextPlugin } from 'gsap/TextPlugin.js';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animate(entry.target);
            animateLogo(entry.target)
        }
    })
});


function animate(elem) {
    const delay = elem.dataset.delay ? elem.dataset.delay * 1000 : 0

    if (elem.hasAttribute('data-animate-left')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-left');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-right')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-right');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-top')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-top');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-bottom')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-bottom');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-opacity')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-opacity');
        }, delay);
    }
    if (elem.hasAttribute('data-animate-svg')) {
        setTimeout(() => {
            elem.removeAttribute('data-animate-svg');
        }, delay);
    }
}

const animateElems = document.querySelectorAll('[data-animate]');
export const animateAction = () => {
    if (!animateElems.length) return;

    animateElems.forEach(elem => {
        observer.observe(elem);
    })
}

// stagger animations
const observerStagger = new IntersectionObserver((entries, self) => {
    let targets = entries
        .map(entry => {
            if (entry.isIntersecting) {
                self.unobserve(entry.target)
                return entry.target;
            }
        })
        .filter(item => item != undefined);

    animateStagger(targets)
});

function animateStagger(elem) {
    gsap.to(elem, {
        opacity: 1,
        duration: 0.3,
        x: 0,
        y: 0,
        y: 0,
        ease: 'ease',
        stagger: 0.2,
    });
}


const animateElemsStagger = document.querySelectorAll('[data-animate-stagger]');
export const animateStaggerAction = () => {
    if (!animateElemsStagger.length) return
    animateElemsStagger.forEach(elem => {
        observerStagger.observe(elem);
    })
}


// stagger svg animations
const observerSVGStagger = new IntersectionObserver((entries, self) => {
    let targets = entries
        .map(entry => {
            if (entry.isIntersecting) {
                self.unobserve(entry.target)
                return entry.target;
            }
        })
        .filter(item => item != undefined);

    animateSVG(targets)
});

function animateSVG(elem, i) {
    gsap.to(elem, {
        duration: 5,
        delay: 0.3,
        strokeDashoffset: 0,
        ease: 'ease',
        stagger: 0.3,
    });
}


const animateSVGElems = document.querySelectorAll('[data-animate-svg]');
export const animateSVGStaggerAction = () => {
    if (!animateSVGElems.length) return
    animateSVGElems.forEach(elem => {
        observerSVGStagger.observe(elem);
    })
}



function animateLogo(logo) {
    const paths = logo.querySelectorAll('path');
    if (!paths.length) return;

    gsap.to(paths, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'ease'
    });
}

const footerLogo = document.querySelector('.footer__logo svg');
export const ainmateFooterLogo = () => {
    if (!footerLogo) return;
    observer.observe(footerLogo);
}
