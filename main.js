import"./assets/script-a090d2c6.js";/* empty css                     */import{T as f}from"./assets/tabs-0d1d1a23.js";let u=document.getElementById("program-reserved");async function d(s){let e=new FormData;return e.append("firstVisit",s.firstVisit),e.append("type",s.type),await(await fetch("/local/ajax/main/weapons.php",{method:"POST",body:e})).json()}const m=s=>{u.innerHTML="",console.log(s),s.forEach(e=>{u.insertAdjacentHTML("afterBegin",`<div data-id="${e.id}" class="flex blockGung flex-col justify-between items-start basis-[414px] p-[18px_18px_32px_18px] bg-[#1A1A19]">
                  <div class="w-full flex flex-col items-start mb-[24px]">
                    <div class="w-full h-full bg-[#222220] mb-[32px]">
                      <img class="w-full h-full object-cover" src="${e.avatar}" alt="">
                    </div>
                    <h3 class="text-[16px] sm:text-xl font-medium leading-[24px] text-white mb-3 sm:mb-[18px] break-words">${e.name}</h3>
                    <p class="text-sm sm:text-[16px] font-normal leading-5 text-[rgba(255,_255,_255,_0.40)] mb-[18px] break-words">${e.description}</p>
                    <a class="text-white text-sm sm:text-[16px] font-normal underline" href="${e.link}">Подробнее</a>
                  </div>
                  <div class="flex w-full items-center justify-between pt-[25px] border-t border-[#2D2D2B]">
                    <span class="text-white text-base sm:text-xl font-normal">${e.price} ₽</span>
                    <button class="flex justify-center items-start py-[18px] px-[30px] bg-[#272723] text-white text-base btn font-normal">Забронировать</button>
                  </div>
                </div>
      `)})},w=()=>{let s=document.querySelectorAll("[data-gun]"),e=document.querySelector('[data-filter="false"]'),a=s[0];e.addEventListener("click",async i=>{i.target.closest(".btn__custom")&&i.target.closest(".btn__custom").classList.toggle("active"),i.currentTarget.dataset.filter==="false"?i.currentTarget.setAttribute("data-filter",!0):i.currentTarget.setAttribute("data-filter",!1);let t=await d({firstVisit:e.dataset.filter,type:a==null?void 0:a.dataset.gun});m(t)}),document.querySelector(".nav-gung").addEventListener("click",async i=>{let t=i.target.closest(".btn__custom");t&&(a===t?(a.classList.remove("active"),a=void 0):(a==null||a.classList.remove("active"),a=t,a.classList.add("active")));let l=await d({firstVisit:e.dataset.filter,type:a==null?void 0:a.dataset.gun});m(l)})};w();document.addEventListener("DOMContentLoaded",()=>{const s=(t,l)=>{let o=l.querySelector(".swiper-pagination-bullet-active"),n=[...l.querySelectorAll(".swiper-pagination-bullet")],r=n.indexOf(o);n.forEach((p,c)=>{r+1!==c&&r-1!==c&&r!==c?p.classList.add("acti"):p.classList.remove("acti")})};new Swiper(".mySwiper",{slidesPerView:3,spaceBetween:30,breakpoints:{320:{slidesPerView:1,spaceBetween:20},750:{slidesPerView:"auto",spaceBetween:28}},pagination:{el:".pagination__custom",dynamicBullets:!0,clickable:!0,renderBullet:function(t,l){return`<div class="${l}">
            <span>${t+1<10?0:""}${t+1}</span>
          </div>`}},navigation:{nextEl:".custom-next",prevEl:".custom-prev"},on:{paginationRender:function(t,l){s(t,l)},init:function(t){console.log(t.pagination.el)}}});let e=document.querySelector(".slidePhoto-pagination__one"),a=document.querySelectorAll("[data-slide-value]");new Swiper(".myGallerey",{allowTouchMove:!1,pagination:{el:".swiper-pagination__mobile",bulletClass:"swiper-pagination-bullet__custom",bulletActiveClass:"swiper-pagination-bullet-active__custom",clickable:!0,renderBullet:function(t,l){return`<div data-slide="${t}" class="${l} whitespace-nowrap cursor-pointer px-[32px] py-[20px] border border-[#2D2D2B] lg:border-none lg:px-12 xl:px-20 2xl:px-[120px] md:py-4 lg:backdrop-blur-xl text-base font-normal">${a[t].dataset.slideValue}</div>`}},breakpoints:{1030:{allowTouchMove:!0,pagination:{el:".swiper-pagination__gallerey"}}}}).on("paginationRender",(t,l)=>{let o=t.pagination.el.querySelector(".swiper-pagination-bullet-active__custom"),n=document.querySelector("#photoPagination");e&&e.classList.remove("active"),n.querySelector(`[data-slide="${o.dataset.slide}"]`)&&(e=n.querySelector(`[data-slide="${o.dataset.slide}"]`),e.classList.add("active"))}),new Swiper(".myPhotoOne",{slidesPerView:1,allowTouchMove:!0,breakpoints:{1030:{allowTouchMove:!1}},navigation:{nextEl:".myGallerey-customOne-next",prevEl:".myGallerey-customOne-prev"}}),new Swiper(".myPhotoTwo",{slidesPerView:1,allowTouchMove:!0,breakpoints:{1030:{allowTouchMove:!1}},navigation:{nextEl:".myGallerey-customTwo-next",prevEl:".myGallerey-customTwo-prev"}}),new Swiper(".myPhotoThree",{allowTouchMove:!0,breakpoints:{1030:{allowTouchMove:!1}},navigation:{nextEl:".myGallerey-customThree-next",prevEl:".myGallerey-customThree-prev"}}),f(".route__tabs",".tabs__head",".tabs__body",".tabs__caption","tabs__caption_active","tabs__content_active")});