import"./assets/script-a090d2c6.js";/* empty css                     */import{S as o,D as r}from"./assets/selectDropDown-316a6a3d.js";import{T as a}from"./assets/tabs-0d1d1a23.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll(".select-catalog__mobile"),s=document.querySelectorAll(".select-catalog");new Swiper(".GungSlider",{slidesPerView:1,spaceBetween:10,breakpoints:{1416:{slidesPerView:4,spaceBetween:30},970:{slidesPerView:3,spaceBetween:30},500:{slidesPerView:2,spaceBetween:30}},pagination:{el:".swiper-pagination__custom",type:"progressbar"},navigation:{nextEl:".myGung-custom-next",prevEl:".myGung-custom-prev",lockClass:!1}}),new Swiper(".InstructorSlider",{slidesPerView:1,spaceBetween:30,breakpoints:{1500:{slidesPerView:4},970:{slidesPerView:3},500:{slidesPerView:2}},pagination:{el:".swiper-pagination__custom",type:"progressbar"},navigation:{nextEl:".InstructorSlider-custom-next",prevEl:".InstructorSlider-custom-prev",lockClass:!1}}),a(".catalog__tabs",".tabs__head",".tabs__body",".tabs__caption","active","tabs__content_active"),t.forEach(e=>{o(e)}),s.forEach(e=>{console.log(e),r(e)})});