"use strict"

import { lockPadding } from '../utils/lockPadding.js';

const url = adminajaxurl.ajaxurl;

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form')
    const thanksPopup = document.querySelector('.popup#thanks');
    const failPopup = document.querySelector('.popup#error');
    const laoder = document.querySelector('.loader');

    if (forms.length) {
        forms.forEach(form => {
            if (form.id != 'searchform') {
                form.addEventListener('submit', async function (e) {
                    e.preventDefault();

                    removeExistingErrorMsgs(form);
                    let error = validateForm(form)
                    console.log(error);

                    const formData = new FormData(form);

                    formData.append('action', 'ajax_form');

                    const formFile = form.querySelector('input[name="file"]');
                    if (formFile && formFile.files[0]) {
                        formData.append('file', formFile.files[0]);
                    }

                    if (form.closest('.cart-order')) {
                        formData.append('title', 'Заказ с интернет-магазина');
                        const cartItems = document.querySelectorAll('.cart-item');

                        let products = []
                        cartItems.forEach(item => {
                            let prodServices = [];
                            const services = item.querySelectorAll('input[name="service"]')
                            if (services.length) {
                                services.forEach(serv => {
                                    prodServices.push({
                                        'name': serv.closest('label').textContent,
                                        'price': serv.value
                                    })
                                })
                            }

                            products.push({
                                'name': item.querySelector('.cart-item__title').textContent,
                                'link': item.querySelector('.cart-item__title').href,
                                'price': item.querySelector('.cart-item__price').dataset.price,
                                'qty': item.querySelector('.qty').value,
                                'services': prodServices
                            })
                        })

                        createFormData(formData, 'products', products);

                        // formData.append('products', products);
                    }
                    else {
                    }

                    formData.append('page_url', window.location.href);
                    formData.append('action', 'ajax_forms');

                    if (error === 0) {
                        form.classList.add('_sending');

                        let response = await fetch(url, {
                            method: 'POST',
                            body: formData
                        });

                        let result = await response.json();

                        if (response.ok) {
                            console.log(result);
                            sentMessage(form)
                            form.reset();
                            resetForm(formFile);
                            form.classList.remove('_sending');

                            if (form.closest('.cart-order') && result.show_empty_cart) {
                                document.querySelector('.cart-table').remove();
                                document.querySelector('.cart .section__body').insertAdjacentHTML('beforeend', result.show_empty_cart);
                                document.querySelectorAll('[data-cart-count]').forEach(item => item.textContent = 0);
                            }
                        }
                        else {
                            console.log(result);
                            failMessage(form)
                            resetForm(formFile);
                            form.classList.remove('_sending');
                        }
                    }
                    else {
                        fillAllFields(form)
                        resetForm(formFile);
                        form.classList.remove('_sending');
                    }
                })

                checkCheckBoxes(form)
            }
        })
    }

    function validateForm(form) {
        let error = 0;
        const formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]

            validateInput()

            input.addEventListener('input', function () {
                validateInput();
            })

            function validateInput() {
                if (input.getAttribute('type') === 'email') {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                    else {
                    }
                }
                else {
                    if (input.getAttribute('name') === 'phone') {
                        if (/[_]/.test(input.value) || input.value.length < 16) {
                            formAddError(input);
                            error++;
                        } else {
                        }
                    }
                    else {
                        if (input.value.length < 2) {
                            formAddError(input);
                            error++;
                        } else {
                        }
                    }
                }
            }
        }

        const checkBoxContainers = form.querySelectorAll('[data-checkbox-container]')
        let checkedArr = [];
        for (let i = 0; i < checkBoxContainers.length; i++) {
            const checkBoxes = [...checkBoxContainers[i].querySelectorAll('input')]

            checkBoxes.forEach(input => {
                input.addEventListener('input', function () {
                    input.closest('[data-checkbox-container]').classList.remove('_error')
                    removeElemErrorMsg(checkBoxContainers[i])
                })
            })

            checkedArr.push(checkBoxes.some(input => {
                if (!input.checked) {
                    input.closest('[data-checkbox-container]').classList.add('_error')
                }
                else {
                    input.closest('[data-checkbox-container]').classList.remove('_error')
                }
                return input.checked
            }))
        }




        const checked = checkedArr.every(check => { return check == true })
        if (!checked === true) error++

        return error;
    }

    function formAddError(input) {
        input.closest('.form__item').classList.add('_error');
    }


    function fillAllFields(form) {
        console.log('Запольните все поля');
    }


    function removeElemErrorMsg(elem) {
        const msg = elem.closest('form').querySelector(`.form__button .error-msgs a[data-id="${elem.id}"]`)
        if (msg) {
            msg.remove();
        }
    }

    function removeExistingErrorMsgs(form) {
        const existMsgs = form.querySelectorAll('.form__button .error-msgs a')
        if (existMsgs.length) {
            existMsgs.forEach(m => m.remove())
        }
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function sentMessage() {
        const activePopup = document.querySelector('.popup._open');
        if (activePopup) activePopup.classList.remove('_open');

        thanksPopup.classList.add('_open')
        lockPadding();

        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
    }

    function failMessage() {
        failPopup.classList.add('_open')
        lockPadding();

        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
    }

    function hideLoader() {
        laoder.classList.remove('_open')
    }

    function showLoader() {
        laoder.classList.add('_open')
    }

    function resetForm() {
        if (formFile) {
            const fileElem = formFile.closest('.form__item')
            const fileNameElem = fileElem.querySelector('.filename');
            const deleteFileElem = fileElem.querySelector('._delete-file');

            fileNameElem.innerHTML = '+ Прикрепить файл';
            formFile.value = '';

            deleteFileElem.style.display = 'none';
            deleteFileElem.classList.remove('_active');
        }
    }

    const formFile = document.querySelector('input[name="file"]');
    if (formFile) {
        const fileElem = formFile.closest('.form__item')
        const fileNameElem = fileElem.querySelector('.filename');
        const deleteFileElem = fileElem.querySelector('._delete-file');

        formFile.addEventListener('change', () => {
            if (formFile.files[0]) {
                uploadFile(formFile.files[0]);
            }
        });

        deleteFileElem.addEventListener('click', () => {
            fileNameElem.innerHTML = '+ Прикрепить файл';
            formFile.value = '';

            deleteFileElem.classList.remove('_active');
        })

        function uploadFile(file) {

            if (!['application/msword', 'application/pdf', 'application/vnd.ms-powerpoint', 'text/plain'].includes(file.type)) {
                alert('Разрешены только текстовые документы.');
                document.querySelector('#filename').innerHTML = '';
                formFile.value = '';
                return;
            }
            if (file.size > 2 * (1024 * 1024)) {
                alert('Файл должен быть менее 2 МБ.');
                return;
            }

            var reader = new FileReader();

            reader.onload = function (e) {
                fileNameElem.innerHTML = file.name;
                deleteFileElem.classList.add('_active');
            };

            reader.onerror = function (e) {
                alert('Ошибка');
            };

            reader.readAsDataURL(file);
        }
    }
});

function checkCheckBoxes(form) {
    const checkBoxContainers = form.querySelectorAll('[data-checkbox-container]')
    if (checkBoxContainers.length) {
        checkBoxContainers.forEach(container => {
            const cehckboxes = container.querySelectorAll('input[type="checkbox"]')
            if (cehckboxes.length) {
                cehckboxes.forEach(checkbox => {
                    checkbox.addEventListener('input', () => {
                        cehckboxes.forEach(item => {
                            if (item != checkbox) {
                                item.checked = false
                            }
                        })
                    })
                })
            }
        })
    }
}

function createFormData(formData, key, data) {
    if (data === Object(data) || Array.isArray(data)) {
        for (var i in data) {
            createFormData(formData, key + '[' + i + ']', data[i]);
        }
    } else {
        formData.append(key, data);
    }
}


const fileDeleteBtn = document.querySelector('._delete-file');
if (fileDeleteBtn) {
    fileDeleteBtn.addEventListener('click', (e) => {
        document.querySelector('.filename').innerHTML = '+ Прикрепить файл';
        e.target.classList.remove('_active');
    })
}