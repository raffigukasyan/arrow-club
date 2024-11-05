// import '@splidejs/splide/css/core';
// import Splide from '@splidejs/splide';

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
        console.log(index);
          return `<div class="${ className}">
            <span>0${index + 1}</span>
          </div>`;
    },      
  },
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },
});


swiper.on('paginationRender', function (swiper, paginationEl) {
  let activeElement = paginationEl.querySelector('.swiper-pagination-bullet-active');
  let element = [...paginationEl.querySelectorAll('.swiper-pagination-bullet')];
  let indexActive = element.indexOf(activeElement);

  element.forEach((item, idx) => {
    if (indexActive + 1 !== idx && indexActive - 1 !== idx && indexActive !== idx) {
      item.classList.add('acti');
    }
    else {
      item.classList.remove('acti');
    }
  });
});


let myGallerey = new Swiper(".myGallerey", {
  navigation: {
    nextEl: ".myGallerey-custom-next",
    prevEl: ".myGallerey-custom-prev",
  },
});


let myArsenal = new Swiper(".myArsenal", {
  slidesPerView: "auto",
  spaceBetween: 20,
  //slidesPerView: 6,
  navigation: {
    nextEl: ".myArsenal-custom-next",
    prevEl: ".myArsenal-custom-prev",
    lockClass: false
  },
});

let imageGang = new Swiper(".imageGang", {
  slidesPerView: 1,


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
})

let swiperNews = new Swiper(".newsSwiper", {
  slidesPerView: 1,
  breakpoints: {
    1460: {
      slidesPerView: 2,
      spaceBetween: 33
    }
  },
})

let myProgram = new Swiper(".myProgram", {
  slidesPerView: 1,
  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  },
  pagination: {
    el: ".swiper-pagination__custom",
    type: "progressbar",
  },
})



// let as = swiper.pagination.el.querySelectorAll('div');

// as.forEach((item, i) => {
//   if (i > 3) {
//     console.log(item);
//   }
// })


// splideGallery.on('pagination:mounted', function (data) {
//   // You can add your class to the UL element
//   // data.items.forEach((el) => {
//   //   console.log(el)
//   // });
//   let fixElem = document.createElement('li');
//   fixElem.className = 'flex items-end mb-[800px] gap-10';
//   fixElem.innerHTML = `<span class="block w-[1px] h-[19px] bg-[rgba(255,_255,_255,_0.15)]"></span>
//         <span class="block w-[1px] h-[19px] bg-[rgba(255,_255,_255,_0.15)]"></span>
//         <span class="block w-[1px] h-[37px] bg-[rgba(255,_255,_255,_0.15)]"></span>
//         <span class="block w-[1px] h-[19px] bg-[rgba(255,_255,_255,_0.15)]"></span>
//         <span class="block w-[1px] h-[19px] bg-[rgba(255,_255,_255,_0.15)]"></span>`;
//   data.list.classList.add('splide__pagination--custom');

//   let lis = data.list.querySelectorAll('li');

//   lis.forEach((el, i) => {
//     if (i !== lis.length - 1) {
//       el.insertAdjacentHTML('beforeend', `<div class="splide__pagination__li-custom">
//         <span class=""></span>
//         <span class=""></span>
//         <span class="special"></span>
//         <span class=""></span>
//         <span class=""></span>
//       </div>`);
//     }
//   })
  
//   console.log(data.items);
//   // `items` contains all dot items
//   data.items.forEach(function (item) {
//     console.log(item)
//     item.button.innerHTML = `<span>${0 + String(item.page + 1)}</span>`;
//   });
// });

// splideGallery.mount();

//     <div class="w-fit inline-flex items-center py-2 pl-2 bg-[#1A1A19]">
//     <div class="max-w-full flex justify-center items-center px-5 h-[105px] bg-[#222220]">
//     <img src="/img/arsenalSlide.png" alt="">
//     </div>
// <div class="px-4 max-w-[131px] text-base text-white">Beretta 486 Parallelo</div>
// </div>