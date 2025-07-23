const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
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
    spaceBetween: 10,
    thumbs: {
        swiper: swiperThumbs,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});