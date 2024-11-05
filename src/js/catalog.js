import './script.js';
import {SelectDropDown, DropDownMenu} from "./selectDropDown.js";
import {Tabs} from "./tabs.js";


document.addEventListener('DOMContentLoaded', () => {
    const courseMobileWrapper = document.querySelectorAll('.select-catalog__mobile')
    const selectProgram = document.querySelectorAll('.select-catalog');

    let GungSlider = new Swiper(".GungSlider", {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            1416: {
                slidesPerView: 4,
                spaceBetween: 30,
            },

            970: {
                slidesPerView: 3,
                spaceBetween: 30,
            },

            500: {
                slidesPerView: 2,
                spaceBetween: 30,
            }

        },
        pagination: {
            el: ".swiper-pagination__custom",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".myGung-custom-next",
            prevEl: ".myGung-custom-prev",
            lockClass: false
        }
    })

    let InstructorSlider = new Swiper(".InstructorSlider", {
        slidesPerView: 1,
        spaceBetween: 30,

        breakpoints: {
            1500: {
                slidesPerView: 4,
            },

            970: {
                slidesPerView: 3
            },

            500: {
                slidesPerView: 2
            }
        },
        pagination: {
            el: ".swiper-pagination__custom",
            type: "progressbar",
        },


        navigation: {
            nextEl: ".InstructorSlider-custom-next",
            prevEl: ".InstructorSlider-custom-prev",
            lockClass: false
        }
    });

    Tabs('.catalog__tabs', '.tabs__head', '.tabs__body', '.tabs__caption', 'active', 'tabs__content_active')
    courseMobileWrapper.forEach((item) => {
        SelectDropDown(item);
    })

    selectProgram.forEach((select) => {
        console.log(select);
        DropDownMenu(select);
    });
})