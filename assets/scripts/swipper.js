const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    spaceBetween: 20, 
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

const swiperThumbs = new Swiper(".topInnovationsSwiper-thumbs", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
});

const swiperMain = new Swiper(".topInnovationsSwiper-main", {
    loop: true,
    grabCursor: true,
    spaceBetween: 10,
    thumbs: {
        swiper: swiperThumbs,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});