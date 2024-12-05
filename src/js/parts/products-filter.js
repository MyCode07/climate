const productFitlerForm = document.querySelector('#product-fitler-form');
const productSection = document.querySelector('.products');
const fitlersArea = document.querySelector('.filters-area');
const productGrid = document.querySelector('.products .grid');
const productCount = document.querySelector('.woocommerce-result-count');
const productsPagination = document.querySelector('.products-pagination');
const body = document.body;
const resetFiltersBtn = document.querySelector('.active-filters .reset-filters')
const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]')
const activeFiltersWrap = document.querySelector('.active-filters__body');

const minPriceInput = document.querySelector('.filter input[name="min_price"]');
const maxPriceInput = document.querySelector('.filter input[name="max_price"]');
const orderbyInput = document.querySelector('.filter input[name="orderby"]');

const category = document.querySelector('[data-category]');
const url = adminajaxurl.ajaxurl;





export async function productFilter(goPageOne = true) {
    let formdata = new FormData(productFitlerForm);

    if (minPriceInput.value == minPriceInput.dataset.value) {
        formdata.delete('min_price')
    }

    if (maxPriceInput.value == maxPriceInput.dataset.value) {
        formdata.delete('max_price')
    }

    if (orderbyInput.value == '') {
        formdata.delete('orderby')
    }

    const querydata = getUnifiedFormData(formdata)
    console.log('querydata', querydata);


    const queryString = new URLSearchParams(formdata).toString()
    let string = '';
    for (const key in querydata) {
        if (Object.hasOwnProperty.call(querydata, key)) {
            const value = querydata[key];

            let str = value;
            if (Object.is(value)) {
                str = value.split(',')
            }

            string += key + '=' + str + '&';
        }
    }

    string = string.substring(0, string.length - 1);

    let newUrl = `${window.location.pathname}?${string}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    ///
    if (goPageOne) {
        newUrl = newUrl.replace(/page\/[0-9]\//, '')
    }
    ///

    window.history.replaceState({}, '', newUrl)
    window.location.reload();

    return;
    // ajax start

    formdata.append('action', 'ajaxfilter')
    formdata.append('product_cat', category.dataset.category)

    // formdata = Object.fromEntries(formdata)
    formdata = getUnifiedFormData(formdata)
    console.log('formdata', formdata);


    $.ajax({
        url: url,
        cache: false,
        timeout: 300000,
        type: 'POST',
        data: formdata,
        beforeSend: function () {
            body.classList.add('_loading')
        },
        success: function (result) {
            console.log(result);

            const title = document.querySelector('title')
            const pageTitle = document.querySelector('input#page-title');

            title.textContent = pageTitle.value
            productGrid.innerHTML = result.products;
            productCount.innerHTML = result.count;

            if (productsPagination) {
                if (result.pagination) {
                    productsPagination.innerHTML = result.pagination;
                }
                else {
                    productsPagination.innerHTML = '';
                }
            }

        },
        error: function (error) {
            console.log(error);
        },

        // помянть также хлебные крошки и заголовки страницы 
        complete: function () {
            body.classList.remove('_loading')
            activeFitlersAction();

            const queryString = new URLSearchParams(window.location.search).toString();

            let newUrl = `${window.location.pathname}?${queryString}${window.location.hash}`;
            if (newUrl[newUrl.length - 1] == '?') {
                newUrl = newUrl.replace('?', '')
            }
            newUrl = newUrl.replace(/page\/\d\//, '');
            console.log(newUrl);
            window.history.replaceState({}, '', newUrl)
        }
    })
}

function getUnifiedFormData(formdata) {
    return [
        ...formdata.entries()
    ]
        .reduce((result, [key, value]) => {

            if (Object.hasOwn(result, key)) {
                if (Array.isArray(result[key])) {

                    result[key].push(value);
                } else {
                    result[key] = [result[key], value];
                }
            } else {
                result[key] = value;
            }
            return result;

        }, {});
}

function activeFitlersAction() {

    if (filterCheckboxes.length) {
        filterCheckboxes.forEach(input => {
            const id = input.id.replace('select-', '')
            const type = id.split('-')[0]


            if (input.checked) {
                addActiveFilter(type, id, input.value)
            }
            else {
                const active = activeFiltersWrap.querySelector(`[data-custom-field="${id}"]`)
                if (active) {
                    active.remove()
                }
            }
        })
    }

    if (minPriceInput.value !== minPriceInput.dataset.value) {
        addActiveFilter('price_filter', 'min_price', minPriceInput.value)
    }
    else {
        const activeMinPrice = activeFiltersWrap.querySelector('[data-custom-field="min_price"]')
        if (activeMinPrice) {
            activeMinPrice.remove()
        }
    }

    if (maxPriceInput.value !== maxPriceInput.dataset.value) {
        addActiveFilter('price_filter', 'max_price', maxPriceInput.value)
    }
    else {
        const activeMaxPrice = activeFiltersWrap.querySelector('[data-custom-field="max_price"]')
        if (activeMaxPrice) {
            activeMaxPrice.remove()
        }
    }

    if (!document.querySelector('.active-filters__item')) {
        resetFiltersBtn.classList.add('_hide')
    }


    function addActiveFilter(type, id, value) {
        const item = `<button class="active-filters__item" data-filter-type="${type}" data-custom-field="${id}">${value}</button>`
        resetFiltersBtn.classList.remove('_hide')

        if (!activeFiltersWrap.querySelector(`[data-custom-field="${id}"]`)) {
            activeFiltersWrap.insertAdjacentHTML('afterbegin', item)
        }
    }
}


export function removeSearchParam(name) {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search.slice(1))
    params.delete(name);

    let newUrl = `${window.location.pathname}?${params}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    window.history.replaceState({}, '', newUrl)
    console.log(newUrl);
}


// reset filters
export function resetFilters() {
    minPriceInput.value = minPriceInput.dataset.value
    maxPriceInput.value = maxPriceInput.dataset.value
    orderbyInput.value = ''
    window.history.pushState(null, null, productSection.dataset.pagenumlink);
}