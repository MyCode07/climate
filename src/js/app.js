import { maskInputs } from "./static/inputmask.js";
import { accorden } from "./static/accordeon.js";
import { runTicker } from "./static/ticker.js";
import { replaceDomElements } from "./static/replace.js";
import { stickyHeader } from "./parts/header.js";
import { playVideoAction } from "./parts/video.js";
import { range } from "./parts/range.js";

import "./parts/forms.js";
import "./parts/sliders.js";
import "./parts/popup.js";
import "./parts/menu.js";
import "./parts/tabs.js";
import "./parts/service-image-hover.js";
import "./parts/filters.js";
import "./parts/cart.js";
import "./parts/single-product.js";
import "./parts/products-filter.js";

range();
accorden();
replaceDomElements();
runTicker();
stickyHeader();
maskInputs('+7 (999) 999-99-99', '[name="phone"]')
playVideoAction();

import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {
});


document.addEventListener('click', function (e) {
    let targetEl = e.target;
    if (targetEl.classList.contains('pages-close')) {
        document.querySelector('.pages').classList.toggle('_hide');
    }
})