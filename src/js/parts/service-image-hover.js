import { gsap } from 'gsap'
import { isMobile } from '../utils/isMobile.js'

const aboutServices = document.querySelector('.about-services .section__bottom a')
if (aboutServices) {
    gsap.utils.toArray('.about-services .section__bottom a')
        .forEach(item => {
            let { label } = item.dataset
            const image = item.querySelector(`img[data-image=${label}]`);
            const imageSizes = image.getBoundingClientRect();

            item.addEventListener('mousemove', (e) => {
                gsap.to(image, {
                    x: e.clientX / 2 + imageSizes.width,
                    y: -e.clientY / 2 - imageSizes.heigth,
                    left: 0,
                    top: 0,
                })
                gsap.to(image, { opacity: 1, scale: 1 })
                gsap.set(image, { zIndex: 1 })
                gsap.set(item, { zIndex: 2 })
            })

            item.addEventListener('mouseleave', (e) => {
                gsap.to(image, { opacity: 0, zIndex: -1, scale: .80 })
                gsap.set(item, { zIndex: 0 })
            })
        })
}



const categorySections = document.querySelectorAll('.category .category-item');
const duration = 0.5

if (categorySections.length && !isMobile.any()) {
    categorySections.forEach(cat => {
        const links = cat.querySelectorAll('ul li');
        const images = cat.querySelectorAll('.category-item__image-scroll .img');
        const wrapper = cat.querySelector('.category-item__links');

        if (links.length) {
            links.forEach((link, i) => {
                link.addEventListener('mouseenter', () => {
                    const activeLink = cat.querySelector('._enter');

                    if (activeLink) {
                        activeLink.classList.remove('_enter')
                    }

                    link.classList.add('_enter')

                    images.forEach((img, index) => {
                        if (index == i + 1) {
                            gsap.to(img, {
                                opacity: 1,
                                duration: duration,
                            })
                        }
                        else {
                            gsap.to(img, {
                                opacity: 0,
                                duration: duration,
                            })
                        }
                    })

                })

            })

            wrapper.addEventListener('mouseleave', (e) => {
                images.forEach((img, index) => {
                    if (index == 0) {
                        gsap.to(img, {
                            opacity: 1,
                            duration: duration,
                        })
                    }
                    else {
                        gsap.to(img, {
                            opacity: 0,
                            duration: duration,
                        })
                    }
                })
            })
        }
    });
}