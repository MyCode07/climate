import { lockPadding, unLockPadding } from '../utils/lockPadding.js';
import { productFilter, removeSearchParam, resetFilters } from './products-filter.js';

const filter = document.querySelector('.filter');
const resetFiltersBtn = document.querySelector('.active-filters .reset-filters')

const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]')
const minPriceInput = document.querySelector('.filter input[name="min_price"]');
const maxPriceInput = document.querySelector('.filter input[name="max_price"]');
const orderbyInput = document.querySelector('.filter input[name="orderby"]');

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    const ativeSelect = document.querySelector('.select-input._active');


    // select actions
    if (targetEl.classList.contains('select-input')) {

        if (ativeSelect && ativeSelect !== targetEl) {
            ativeSelect.classList.remove('_active')
        }
        targetEl.classList.toggle('_active')
    }


    // select items actions
    if (targetEl.closest('.select-body') && targetEl.hasAttribute('data-id')) {
        const select = targetEl.closest('.select-input');
        const input = targetEl.querySelector('input')

        select.classList.remove('_active')

        if (input) {
            const filterElem = filter.querySelector(`input[id="${input.id.replace('select-', '')}"]`);
            if (filterElem) {
                if (input.checked) {
                    filterElem.checked = false;
                }
                else {
                    filterElem.checked = true;
                }
            }
        }

        if (targetEl.closest('.filter-sort')) {
            const sort = targetEl.querySelector('a').dataset.sort
            orderbyInput.value = sort;
            productFilter(false);

        }
        else {
            productFilter();
        }
    }

    // принудительно вернутся ма 1 страницу при клике на ремове активе филтер
    // remove active filters
    if (targetEl.classList.contains('active-filters__item')) {
        const name = targetEl.dataset.customField;


        const filterElem = filter.querySelector(`input[id="${name}"]`);
        const filterElemInSelect = document.querySelector(`.filters-area input[id="select-${name}"]`);
        if (filterElem) {
            filterElem.checked = false
        }
        if (filterElemInSelect) {
            filterElemInSelect.checked = false
        }

        if (name == 'max_price') {
            maxPriceInput.value = maxPriceInput.dataset.value
        }

        if (name == 'min_price') {
            minPriceInput.value = minPriceInput.dataset.value
        }

        removeSearchParam(name)

        targetEl.remove()
        productFilter();

        if (!document.querySelector('.active-filters__item')) {
            resetFiltersBtn.classList.add('_hide')
            orderbyInput.value = '';
        }
    }

    if (targetEl.hasAttribute('apply-filters')) {
        productFilter();
    }


    // reset fitlers
    if (targetEl.hasAttribute('data-reset-filters')) {
        const activeFilters = document.querySelectorAll('.active-filters__item');
        if (activeFilters.length) {
            activeFilters.forEach(item => item.remove())
        }

        const checkedInputs = document.querySelectorAll('.filter input[type="checkbox"]');
        if (checkedInputs.length) {
            checkedInputs.forEach(input => input.checked = false)
        }

        const selects = document.querySelectorAll('.select-input');
        if (selects.length) {
            selects.forEach(select => {
                select.classList.remove('_active')

                const inputs = select.querySelectorAll('input[type="checkbox"]');
                if (inputs.length) {
                    inputs.forEach(input => input.checked = false)
                }
            })
        }
        orderbyInput.value = '';

        resetFiltersBtn.classList.add('_hide')
        resetFilters();
        productFilter();
    }

    // select actions
    if (!targetEl.classList.contains('select-input') && !targetEl.closest('.select-input') && document.querySelector('.select-input._active')) {
        document.querySelector('.select-input._active').classList.remove('_active')
    }


    // open filters
    if (targetEl.hasAttribute('data-open-filter')) {
        filter.classList.add('_open')
        lockPadding();
    }

    // close filters
    if (targetEl.hasAttribute('data-close-filter')) {
        filter.classList.remove('_open')
        unLockPadding();
    }
})

if (filterCheckboxes.length) {
    filterCheckboxes.forEach(input => {
        const filterElem = document.querySelector(`.filter-fast input[id="select-${input.id}"]`);

        input.addEventListener('change', () => {
            if (filterElem) {
                if (input.checked) {
                    filterElem.checked = true;
                }
                else {
                    filterElem.checked = false;
                }
            }
        })
    })
}