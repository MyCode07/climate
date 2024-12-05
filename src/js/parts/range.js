import dhx from 'dhx-suite'
import { productFilter } from './products-filter.js';

const formatter = new Intl.NumberFormat("ru");
const activeFilters = document.querySelector('.active-filters__body');
const resetFilters = document.querySelector('.active-filters .reset-filters')
const minPriceInput = document.querySelector('.filter input[name="min_price"]')
const maxPriceInput = document.querySelector('.filter input[name="max_price"]')


export function range() {
    const ranges = document.querySelectorAll('.range');

    if (!ranges) return;


    let sliders = []
    let mins = []
    let maxs = []
    ranges.forEach(range => {

        const minOutElem = range.querySelector('.range-min');
        const maxOutElem = range.querySelector('.range-max');
        const min = +range.dataset.min ?? 0;
        const max = +range.dataset.max ?? 0;
        const step = +range.dataset.step ?? 1;

        const valueMin = +minOutElem.dataset.value ?? 0
        const valueMax = +maxOutElem.dataset.value ?? 0

        const sliderRange = new dhx.Slider(range.querySelector('.range-slider'), {
            min: min,
            max: max,
            step: step,
            range: true,
            value: [valueMin, valueMax]
        });

        sliders.push(sliderRange)
        mins.push(min)
        maxs.push(max)

        sliderRange.events.on('change', () => {
            minOutElem.dataset.value = sliderRange.getValue()[0]
            minOutElem.querySelector('ins').textContent = formatter.format(sliderRange.getValue()[0])

            maxOutElem.dataset.value = sliderRange.getValue()[1]
            maxOutElem.querySelector('ins').textContent = formatter.format(sliderRange.getValue()[1])

            if (sliderRange.getValue()[0] > min) {
                createFitlerItem('min_price', 'min ' + minOutElem.textContent)
            }
            else {
                removeFitlerItem('min_price')
            }

            if (sliderRange.getValue()[1] < max) {
                createFitlerItem('max_price', 'max ' + maxOutElem.textContent)
            }
            else {
                removeFitlerItem('max_price')
            }
            minPriceInput.value = sliderRange.getValue()[0];
            maxPriceInput.value = sliderRange.getValue()[1];
        });

        // ajax product func here
        sliderRange.events.on("mouseUp", function (e) {
            if (!range.closest('#product-fitler-form')) {
                productFilter();
            }
        });
    });

    document.addEventListener('click', function (e) {
        let targetEl = e.target;

        // ajax product func here
        if (targetEl.classList.contains('dhx_slider__track') && !targetEl.closest('#product-fitler-form')) {
            productFilter();
        }

        // reset min price
        if (targetEl.dataset.customField == 'min_price') {

            sliders.forEach((slide, i) => {
                slide.setValue([mins[i], slide.getValue()[1]])
                minPriceInput.value = mins[i];
            })
        }

        // reset max price
        if (targetEl.dataset.customField == 'max_price') {
            sliders.forEach((slide, i) => {
                slide.setValue([slide.getValue()[0], maxs[i]])
                maxPriceInput.value = maxs[i]
            })

        }

        // reset all filters
        if (targetEl.hasAttribute('data-reset-filters') && sliders) {
            sliders.forEach((slide, i) => {
                slide.setValue([mins[i], maxs[i]])

                minPriceInput.value = mins[i];
                maxPriceInput.value = maxs[i]
            })
        }
    })


    document.addEventListener('click', function (e) {
        let targetEl = e.target;

        if (targetEl.hasAttribute('data-open-filter')) {
            sliders[0].setValue(sliders[1].getValue())
        }

        if (targetEl.hasAttribute('data-close-filter')) {
            sliders[1].setValue(sliders[0].getValue())
        }
    })


}



function createFitlerItem(id, text) {
    const item = `<button class="active-filters__item" data-custom-field="${id}">${text}</button>`

    const activeItem = activeFilters.querySelector(`[data-custom-field="${id}"]`)
    if (!activeItem) {
        activeFilters.insertAdjacentHTML('afterbegin', item)
    }
    else {
        activeItem.textContent = text
    }

    resetFilters.classList.remove('_hide')
}

function removeFitlerItem(id) {
    const activeItem = activeFilters.querySelector(`[data-custom-field="${id}"]`)
    if (activeItem) {
        activeItem.remove();
    }

    if (!document.querySelector('.active-filters__item')) {
        resetFilters.classList.add('_hide')
    }
}