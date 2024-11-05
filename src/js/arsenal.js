import './react/FormReservation.jsx';
import { Fancybox } from "@fancyapps/ui";
import './script.js';
import {SelectDropDown, DropDownMenu} from "./selectDropDown.js";
import {Tabs} from "./tabs.js";


const courseMobileWrapper = document.querySelectorAll('.select-program__mobile');


const getCourse = async(id) => {
    const resp = await fetch(`/local/ajax/arsenal/program.php?id=${id}`).then((res) => {
        if(res.ok) {
            return res.json();
        }
    });
    if(resp) fillingCouse(resp, id);

}

const fillingCouse = (resp, id) => {
    const title = document.querySelector('[data-title]');
    const body = document.querySelector('[data-id]');
    const description = document.querySelector('[data-desc]');
    const properties = document.querySelector('[data-properties]');
    const image = document.querySelector('[data-image]');
   // const progressBar = document.querySelector('[data-progress="bar"]');
    //const progressValue = document.querySelector('[data-progress="value"]');
    const difficulty = document.querySelector('[data-difficulty]');
    const price = document.querySelector('[data-price]');

    body.setAttribute("data-id", id);
    title.innerHTML = resp.title;
    description.innerHTML = resp.description;
    properties.innerHTML = resp.characteristic;
    image.src = resp.image;
    //progressValue.innerHTML = resp.progress + '%';
    //progressBar.style.width = `${resp.progress + '%'}`
    difficulty.innerHTML = resp.difficulty;
    price.innerHTML = `Цена: ${resp.price}`
}

const selectCourse = ()=>  {
    const courseWrapper = document.querySelectorAll('.gunCourse');
    let activeCourse = document.querySelector('.course-text');

    courseMobileWrapper.forEach((select) => {
        const menuCourse = select.querySelector('.menu');

        menuCourse.addEventListener('click', (eve) => {
            getCourse(Number(eve.target.dataset?.courseId))
        })
    })

    courseWrapper.forEach((bodyCourse) => {
        bodyCourse.addEventListener('click', async(eve) => {
            if(eve.target.closest('.course-text')) {
                if(activeCourse) {
                    activeCourse.classList.remove('active');
                }
                activeCourse = eve.target;
                getCourse(Number(activeCourse.dataset?.courseId));
                activeCourse.classList.add('active');
            }
        })
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const selectProgram = document.querySelectorAll('.select-program');


    let myArsenal = new Swiper(".myArsenal", {
        slidesPerView: "auto",
        spaceBetween: 6,

        breakpoints: {
            500: {
                spaceBetween: 20
            }
        },
        //slidesPerView: 6,
        navigation: {
            nextEl: ".myArsenal-custom-next",
            prevEl: ".myArsenal-custom-prev",
            lockClass: false
        },
        pagination: {
            el: ".swiper-pagination__custom",
            type: "progressbar",
        },
    });
    let imageGang = new Swiper(".imageGang", {
        slidesPerView: 1,
        spaceBetween: 15,
        pagination: {
            el: ".imageGang-pagination",
            type: "custom",
            renderCustom: function (swiper, current, total) {
                return `<span class="text-white">0${current}</span> <span class="text-[rgba(255,_255,_255,_0.30)]">/ 0${total}</span>`;
            }
        },
        navigation: {
            nextEl: ".imageGang-button-next",
            prevEl: ".imageGang-button-prev",
        },
    });

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

    selectCourse();

    Fancybox.bind('[data-fancybox="weapons"]', {
        // Your custom options for a specific gallery
    });


    Tabs('.program__tabs', '.tabs__head', '.tabs__body', '.tabs__caption', 'active', 'tabs__content_active')
    courseMobileWrapper.forEach((item) => {
        SelectDropDown(item);
    })
    selectProgram.forEach((select) => {
        DropDownMenu(select);
    })
})