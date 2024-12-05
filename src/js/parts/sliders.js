import Swiper from 'swiper';
import {Pagination, Autoplay } from 'swiper/modules';

const sliders = document.querySelectorAll('.swiper');
if (sliders.length) {
    sliders.forEach(slider => {
        const section = slider.closest('section');
        let prev = section.querySelector('.prev')
        let next = section.querySelector('.next')
        let pagination = section.querySelector('.pagination')

        if (slider.closest('.product-slider')) {
            new Swiper(slider, {
                modules: [Autoplay, Pagination],
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 50,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
                },
            })
        }

        if (slider.closest('.page-about')) {
            new Swiper(slider, {
                modules: [Pagination],
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
            })
        }
    })
}


