const servicesTitle = document.querySelectorAll('._title');

if (servicesTitle) {
    servicesTitle.forEach(service => {
        service.addEventListener('click', (e) => {
            const serviceCard = service.closest('.service-card');
            serviceCard.classList.toggle('_active');

            const serviceCardBtn = service.closest('.service-card').querySelector('._btn');
            serviceCardBtn.classList.toggle('_btn-black');
        })
    });
}
