import './script.js';

const customSwiper = (swiper, pagEl) => {

    let activeElement = pagEl.querySelector('.swiper-pagination-bullet-active');
    let element = [...pagEl.querySelectorAll('.swiper-pagination-bullet')];
    let indexActive = element.indexOf(activeElement);


    element.forEach((item, idx) => {
        if (indexActive + 1 !== idx && indexActive - 1 !== idx && indexActive !== idx) {
            item.classList.add('acti');
        }
        else {
            item.classList.remove('acti');
        }
    });
}

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },

        750: {
            slidesPerView: "auto",
            spaceBetween: 28
        }
    },

    pagination: {
        el: ".pagination__custom",
        dynamicBullets: true,
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class="${ className}">
            <span>${index < 10 ? 0 : ''}${index + 1}</span>
          </div>`;
        },
    },

    navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
    },
    on: {
        paginationRender: function (swiper, paginationEl) {
            customSwiper(swiper, paginationEl);
        },
        init: function (swiper) {
            console.log(swiper.pagination.el);
            // customSwiper(swiper)
        },
        // activeIndexChange: function (swiper) {
        //   customSwiper(swiper);
        //   // }
    }
});

let myProgram = new Swiper(".myProgram", {
    slidesPerView: 1,
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    },
    pagination: {
        el: ".swiper-pagination__custom",
        type: "progressbar",
    },
})