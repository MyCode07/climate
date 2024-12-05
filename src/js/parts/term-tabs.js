const termTabs = document.querySelectorAll('.terms-tabs button');
const termTabsContent = document.querySelectorAll('.terms-content__item');

export const termsTabAction = () => {
    if (!termTabs.length) return

    termTabs.forEach(tab => {
        const dataId = tab.dataset.id;
        const tabContent = document.querySelector(`#${dataId}`);

        tab.addEventListener('click', (e) => {
            console.log(e.target);
            termTabs.forEach(item => {
                if (item.classList.contains('_active')) item.classList.remove('_active')
            })

            termTabsContent.forEach(item => {
                if (item.classList.contains('_active')) item.classList.remove('_active')
            })

            tab.classList.add('_active')
            tabContent.classList.add('_active')
        })
    })
} 