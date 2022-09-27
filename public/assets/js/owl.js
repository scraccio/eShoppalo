$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText: ["<img class=\"prev-button\" src='/assets/img/nav-arrow.png'></img>","<img class=\"next-button\" src='/assets/img/nav-arrow.png'></img>"],
    dots: false,
    stagePadding: 70,
    responsive: {
        0: {
            items: 1,
            stagePadding: 10
        },
        350: {
            items: 1,
            stagePadding: 30
        },
        450: {
            items: 1,
            stagePadding: 50
        },
        500: {
            items: 1,
            stagePadding: 70
        },
        600: {
            items: 1,
            stagePadding: 120
        },
        700: {
            items: 2,
            stagePadding: 30
        },
        768: {
            items: 2
        },
        1100: {
            items: 3
        },
        1450: {
            items: 4
        },
        1750: {
            items: 5
        }
    },
});