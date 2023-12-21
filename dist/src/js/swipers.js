// const { default: Swiper } = require("swiper");

document.addEventListener("DOMContentLoaded", function () {
   // Пересчет rem в px
   const rem = function (rem) {
      if (window.innerWidth > 769) {
         return 0.005208335 * window.innerWidth * rem;
      } else {
         // где 375 это ширина моб версии макета
         return (100 / 375) * (0.1 * window.innerWidth) * rem;
      }
   };

   const getThreeDigitNumber = function (number) {
      if (number < 10) return String("00" + number);
      else if (number > 10 && number < 100) return String("0" + number);
      else return String(number);
   };

   const getTwoDigitNumber = function (number) {
      if (number < 10) return String("0" + number);
      else if (number > 10 && number < 100) return String("0" + number);
      else return String(number);
   };

   // ГЛАВНАЯ
   const mainHeroBanner = new Swiper(".main-banner__swiper", {
      slidesPerView: 1,
      speed: 700,
      spaceBetween: rem(3),
      lazy: true,
      autoplay: {
         delay: 7000,
         disableOnInteraction: false,
      },
      pagination: {
         clickable: true,
         el: ".main-banner__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".main-banner__swiper-controllers .next",
         prevEl: ".main-banner__swiper-controllers .prev",
      },
   });

   const mainHeroMobileBanner = new Swiper(".main-banner-mobile__swiper", {
      slidesPerView: 1,
      speed: 700,
      spaceBetween: rem(3),
      lazy: true,
      autoplay: {
         delay: 7000,
         disableOnInteraction: false,
      },
      pagination: {
         clickable: true,
         el: ".main-banner__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".main-banner__swiper-controllers .next",
         prevEl: ".main-banner__swiper-controllers .prev",
      },
   });

   if (mainHeroMobileBanner) {
      mainHeroMobileBanner.on("slideChangeTransitionEnd", function () {
         setColorTheme();
      });
   }

   if (mainHeroBanner) {
      mainHeroBanner.on("slideChangeTransitionEnd", function () {
         setColorTheme();
      });
   }

   const setColorTheme = () => {
      const mainSlide = document.querySelector(".main-banner .swiper-slide-active");

      if (mainSlide) {
         const mainBanner = document.querySelector(".main-banner");
         const mainSlideData = mainSlide.getAttribute("data-color");
         if (mainSlideData) {
            mainBanner.classList = `main-banner main-banner--${mainSlideData}`;
         }
      }
   };

   setColorTheme();

   if (document.querySelector(".services__container")) {
      document.querySelectorAll(".services__container").forEach((item) => {
         const prev = item.querySelector(".services__swiper-prev");
         const next = item.querySelector(".services__swiper-next");
         const pagination = item.querySelector(".services__swiper-pagination");
         const slider = item.querySelector(".services__swiper");
         const servicesSwiper = new Swiper(slider, {
            spaceBetween: rem(3.4),
            loop: true,
            pagination: {
               el: pagination,
               clickable: true,
            },
            navigation: {
               nextEl: next,
               prevEl: prev,
            },
            breakpoints: {
               769: {
                  slidesPerView: 4,
                  // spaceBetween: rem(3.4)
               },
               320: {
                  slidesPerView: 1,
                  // spaceBetween: rem(3.55)
               },
            },
         });
      });
   }

   const chronologySwiper = new Swiper(".chronology-swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      allowTouchMove: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      breakpoints: {
         769: {
            slidesPerView: 5.8,
            slidesPerGroup: 5.8,
            allowTouchMove: false,
            allowSlidePrev: false,
            allowSlideNext: false,
         },
      },
      pagination: {
         el: ".chronology__swiper-pagination",
         clickable: true,
      },
      on: {
         slideChange: (swiper) => {
            if (window.screen.width < 768) {
               const slides = swiper.slides;

               slides.forEach((slide, i) => {
                  if (i === swiper.activeIndex) {
                     slide.classList.add("active");
                     return;
                  }

                  slide.classList.remove("active");
               });
            }
         },
      },
   });

   const awaySwiper = new Swiper(".away__swiper", {
      slidesPerView: 3,
      spaceBetween: rem(3.5),
      pagination: {
         clickable: true,
         el: ".services__swiper-pagination",
      },
      navigation: {
         nextEl: ".services__swiper-next",
         prevEl: ".services__swiper-prev",
      },
   });

   const modalMapSwiper = new Swiper(".modal-map__swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
         clickable: true,
         el: ".modal-map__swiper-pagination",
      },
   });

   const formatsSwiper = new Swiper(".formats__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3.5),
      breakpoints: {
         769: {
            slidesPerView: 3,
            spaceBetween: rem(3.5),
         },
      },
      pagination: {
         clickable: true,
         el: ".formats__swiper-pagination",
      },
      navigation: {
         nextEl: ".formats__swiper-next",
         prevEl: ".formats__swiper-prev",
      },
   });

   const urMenuSwiper = new Swiper(".ur-menu__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3.5),
      breakpoints: {
         769: {
            slidesPerView: 3,
            spaceBetween: rem(3.5),
         },
      },
      pagination: {
         clickable: true,
         el: ".ur-menu__swiper-pagination",
      },
      navigation: {
         nextEl: ".ur-menu__swiper-next",
         prevEl: ".ur-menu__swiper-prev",
      },
   });

   const proposalSwiper = new Swiper(".proposal__swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: rem(3.5),
      breakpoints: {
         769: {
            slidesPerGroup: 1,
            slidesPerView: 3,
            spaceBetween: rem(3.5),
         },
      },
      pagination: {
         clickable: true,
         el: ".proposal__swiper-pagination-1",
         // el: '.proposal__swiper-pagination',
      },
      navigation: {
         nextEl: ".proposal__swiper-next",
         prevEl: ".proposal__swiper-prev",
      },
   });

   const newsSwiper = new Swiper(".news__swiper", {
      spaceBetween: rem(3.5),
      pagination: {
         clickable: true,
         el: ".news__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".news__swiper-controllers .swiper-next",
         prevEl: ".news__swiper-controllers .swiper-prev",
      },
      breakpoints: {
         769: {
            slidesPerView: 3,
         },
         320: {
            slidesPerView: 1,
         },
      },
   });

   const eventsSwiper = new Swiper(".events__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3.5),
      speed: 600,
      pagination: {
         clickable: true,
         el: ".events__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".events__swiper-controllers .swiper-next",
         prevEl: ".events__swiper-controllers .swiper-prev",
      },
   });

   const interiors = new Swiper(".interiors__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3),
      centeredSlides: true,
      speed: 600,
      breakpoints: {
         769: {
            slidesPerView: 2.35,
            spaceBetween: rem(3.5),
            loop: true,
         },
      },
      pagination: {
         clickable: true,
         el: ".interiors__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".interiors__swiper-controllers .swiper-next",
         prevEl: ".interiors__swiper-controllers .swiper-prev",
      },
   });

   const aboutValues = new Swiper(".services__swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: rem(3.5),
      speed: 600,
      loop: true,
      breakpoints: {
         769: {
            slidesPerView: 4,
            spaceBetween: rem(3.5),
         },
      },
      pagination: {
         // 	el: '.services__swiper-pagination-1'
         // 	},
         // 	navigation: {
         // 		nextEl: '.serv__swiper-next',
         // 		prevEl: '.serv__swiper-prev'
         // 	}
         // })

         clickable: true,
         el: ".services__swiper-pagination-1",
      },
   });

   const aboutTeamSwiper = new Swiper(".about-team__swiper", {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: rem(3.5),
      speed: 600,
      breakpoints: {
         769: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: rem(3.5),
         },
      },
      pagination: {
         clickable: true,
         el: ".about-team__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".about-team__swiper-controllers .swiper-next",
         prevEl: ".about-team__swiper-controllers .swiper-prev",
      },
   });

   const teamSwiper = new Swiper(".team__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3.4),
      speed: 600,
      breakpoints: {
         769: {
            slidesPerView: 4,
            spaceBetween: rem(3.4),
         },
      },
      pagination: {
         clickable: true,
         el: ".team__swiper-pagination",
      },
      navigation: {
         nextEl: ".services__swiper-next",
         prevEl: "services__swiper-prev",
      },
   });

   const serviceSwiper = new Swiper(".service__swiper", {
      slidesPerView: 4,
      spaceBetween: rem(3.4),
      speed: 600,
      pagination: {
         clickable: true,
         el: ".service__swiper-pagination",
      },
      navigation: {
         nextEl: ".service__swiper-next",
         prevEl: ".service__swiper-prev",
      },
   });

   const servSwiper = new Swiper(".serv__swiper", {
      slidesPerView: 4,
      spaceBetween: rem(3.4),
      speed: 600,
      pagination: {
         clickable: true,
         el: ".serv__swiper-pagination",
      },
      navigation: {
         nextEl: ".serv__swiper-next",
         prevEl: ".serv__swiper-prev",
      },
   });

   const authorcoffeeTypesSwiper = new Swiper(".authorcoffee-types__swiper", {
      slidesPerView: 1,
      spaceBetween: rem(3.5),
      speed: 600,
      pagination: {
         clickable: true,
         el: ".authorcoffee-types__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".authorcoffee-types__swiper-controllers .swiper-next",
         prevEl: ".authorcoffee-types__swiper-controllers .swiper-prev",
      },
   });

   // КАТАЛОГ (ОБЩИЙ)

   const catalogHeroSwiper = new Swiper(".catalog-hero__swiper", {
      slidesPerView: "auto",
      spaceBetween: rem(3),
      effect: "fade",
      pagination: {
         clickable: true,
         el: ".catalog-hero__swiper-controllers .swiper-pagination",
      },
      navigation: {
         nextEl: ".catalog-hero__swiper-controllers .swiper-next",
         prevEl: ".catalog-hero__swiper-controllers .swiper-prev",
      },
   });

   const categoryBlockSwiper = new Swiper(".category-block__swiper", {
      slidesPerView: "auto",
      spaceBetween: rem(2.4),
      navigation: {
         nextEl: ".category-block__btn-right",
         prevEl: ".category-block__btn-left",
      },
      breakpoints: {
         769: {
            spaceBetween: rem(5),
         },
      },

      on: {
         init: function (swiper) {
            swiper.update();
         },
         click: function (swiper, event) {
            if (event.target.classList.contains("category-block__value-show")) {
               let slide = event.target.closest(".category-block__item");

               swiper.$el[0].querySelectorAll(".category-block__item").forEach((item) => {
                  item.classList.remove("active");
               });

               slide.classList.add("active");

               swiper.update();
               swiper.updateSize();
               swiper.updateSlides();
            }
         },
      },
   });
});
