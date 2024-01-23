//функция валидации форм
const initValidation = () => {
   const validateInput = (inputElement, regex) => {
      const inputContainer = inputElement.parentElement;

      const inputHandler = (e) => {
         let inputClass = regex.test(e.target.value) ? "success" : "invalid";
         inputContainer.classList.remove("success", "invalid");
         inputContainer.classList.add(inputClass);

         if (e.target.value === "") {
            inputContainer.classList.remove("success", "invalid");
         }
      };

      inputElement.removeEventListener("input", inputHandler);
      inputElement.addEventListener("input", inputHandler);
   };

   // Валидация имени
   const inputName = document.querySelectorAll(".input-name");
   if (inputName.length > 0) {
      const regName = /^[A-zА-яё]+$/;
      inputName.forEach((item) => {
         validateInput(item, regName);
      });
   }

   // Валидация почты
   const inputEmail = document.querySelectorAll(".input-email");
   if (inputEmail.length > 0) {
      const regEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
      inputEmail.forEach((item) => {
         validateInput(item, regEmail);
      });
   }

   // Валидация телефонного номера
   const inputPhone = document.querySelectorAll(".input-tel");
   if (inputPhone.length > 0) {
      const regPhone = /^\+?\d{1,4}[\s.-]?\(?\d{1,3}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;
      inputPhone.forEach((item) => {
         validateInput(item, regPhone);
      });
   }
};

// Вызов функции для инициализации валидации
initValidation();
document.addEventListener("DOMContentLoaded", initValidation);
//инициируем карту
const mapInitSecond = () => {
   const searchItems = document.querySelectorAll(".map-block__search-item");
   const mapModal = document.querySelector(".modal-map");
   const activeClass = "active";
   const root = document.querySelector("#root");

   //яндекс карта
   if (root) {
      const init = () => {
         const map = new ymaps.Map("root", {
            center: [55.807749, 37.570141],
            zoom: 14,
            type: "yandex#map",
            controls: [],
         });

         const myBlueIcon = new ymaps.Placemark(
            [55.807749, 37.570141],
            {},
            {
               iconLayout: "default#image",
               iconImageHref: "./src/images/svg/generic/geo-map-blue.svg",
               iconImageSize: [66, 74],
            }
         );

         const myBiegeIcon = new ymaps.Placemark(
            [55.810479, 37.570991],
            {},
            {
               iconLayout: "default#image",
               iconImageHref: "./src/images/svg/generic/geo-map-biege.svg",
               iconImageSize: [66, 74],
            }
         );

         const myGreenIcon = new ymaps.Placemark(
            [55.820479, 37.578991],
            {},
            {
               iconLayout: "default#image",
               iconImageHref: "./src/images/svg/generic/geo-map-green.svg",
               iconImageSize: [66, 74],
            }
         );

         myGreenIcon.events.add("click", () => {
            mapModal.classList.add(activeClass);
         });

         myBlueIcon.events.add("click", () => {
            mapModal.classList.add(activeClass);
         });

         myBiegeIcon.events.add("click", () => {
            mapModal.classList.add(activeClass);
         });

         map.geoObjects.add(myBlueIcon);
         map.geoObjects.add(myBiegeIcon);
         map.geoObjects.add(myGreenIcon);

         // скрыть все элементы управления картой
         map.options.set("suppressMapOpenBlock", true);
      };
      ymaps.ready(init);
   }

   //открыть модалку по клику по карточке в списке адресов
   if (searchItems && mapModal) {
      const activeClass = "active";
      searchItems.forEach((item, id) => {
         const link = item.querySelector(".arrow-link");

         const linkClickHandler = () => {
            mapModal.classList.add(activeClass);

            if (item.classList.contains(activeClass)) {
               return;
            } else {
               searchItems.forEach((element, index) => {
                  if (id === index) {
                     element.classList.add(activeClass);
                  } else {
                     if (element.classList.contains(activeClass)) {
                        element.classList.remove(activeClass);
                     }
                  }
               });
            }
         };
         link.removeEventListener("click", linkClickHandler);
         link.addEventListener("click", linkClickHandler);
      });
   }

   //инициируем слайдер для модалки внутри карты

   const modalMapSwiper = new Swiper(".modal-map__swiper", {
      slidesPerView: 1,
      pagination: {
         clickable: true,
         el: ".modal-map__swiper-pagination",
      },
   });

   closeMapModal();
};

//закрытие модалки для карты клик вне поля и по кнопке
const closeMapModal = () => {
   const madals = document.querySelectorAll(".modal-map");
   madals.forEach((block) => {
      const buttons = block.querySelectorAll(".modal__close-btn");
      const removeActiveClass = () => {
         block.classList.remove("active");
      };

      buttons.forEach((btn) => {
         btn.removeEventListener("click", removeActiveClass);
         btn.addEventListener("click", removeActiveClass);
      });

      block.addEventListener("click", (e) => {
         if (e.target === block) {
            block.classList.remove("active");
         }
      });
   });
};
closeMapModal();

const closeModalHandler = () => {
   const modals = document.querySelectorAll(".modal");
   if (!modals) return;

   modals.forEach((mod) => {
      const closeBtn = mod.querySelector(".modal__close-btn");
      const modalRemove = () => {
         mod.classList.remove("active");
      };
      closeBtn.removeEventListener("click", modalRemove);
      closeBtn.addEventListener("click", modalRemove);

      mod.addEventListener("click", (e) => {
         if (e.target === mod) {
            mod.classList.remove("active");
            mod.addEventListener("transitionend", transitionHandler);
         }
      });
   });
};

const removeCheckers = () => {
   const modal = document.querySelectorAll(`.teg-list`);
   modal.forEach((list) => {
      const inputs = list.querySelectorAll("input");
      inputs.forEach((item) => {
         item.checked = false;
      });
   });
};

const clearFilter = () => {
   const clearBtn = document.querySelectorAll("#clear-filter");
   if (clearBtn) {
      clearBtn.forEach((item) => {
         item.removeEventListener("click", removeCheckers);
         item.addEventListener("click", removeCheckers);
      });
   }
};

const initStarsRate = () => {
   const mainWrapper = document.querySelector(".feedback");
   const iconsWrapper = document.querySelector(".rates__icons-wrapper");
   const inputImg = document.querySelector(".upload__input");
   const inputLabel = document.querySelector(".upload__input-label");
   const inputText = document.querySelector(".upload__info");
   const previewImages = document.querySelectorAll(".upload__preview-box");
   const removeBtns = document.querySelectorAll(".upload__preview-box-remove");
   const removeDataBtn = document.querySelector("#remove-feedback-data");

   // добавляем счетчик на символы
   initTextvalueCounter();

   const imagesCounter = () => {
      let validImageCount = 0;
      for (const item of previewImages) {
         const img = item.querySelector("img");
         if (img.getAttribute("src")?.length) {
            validImageCount++;
         }
      }

      if (validImageCount === 5) {
         inputLabel.style.display = "none";
         inputText.style.display = "none";
      } else {
         inputLabel.style.display = "block";
         inputText.style.display = "flex";
      }
   };

   if (iconsWrapper && inputImg && removeBtns && removeDataBtn) {
      //отображение :hover и постоянного выбранного состояния для иконок рейтинга

      const icons = iconsWrapper.querySelectorAll(".rates__icon");
      icons.forEach((icon, id) => {
         const eventHandler = () => {
            icons.forEach((currentIcon, i) => {
               if (i <= id) {
                  currentIcon.classList.add("active");
               } else {
                  currentIcon.classList.remove("active");
               }
            });
         };
         icon.removeEventListener("click", eventHandler);
         icon.addEventListener("click", eventHandler);

         const mouseOverHandler = () => {
            icons.forEach((currentIcon, i) => {
               currentIcon.classList.add("hover-zero");
               if (i <= id) {
                  currentIcon.classList.add("hover-active");
               } else {
                  currentIcon.classList.remove("hover-active");
               }
            });
         };
         const mouseOutHandler = () => {
            icons.forEach((currentIcon) => {
               currentIcon.classList.remove("hover-zero");
               currentIcon.classList.remove("hover-active");
            });
         };
         icon.removeEventListener("mouseover", mouseOverHandler);
         icon.addEventListener("mouseover", mouseOverHandler);

         iconsWrapper.removeEventListener("mouseout", mouseOutHandler);
         iconsWrapper.addEventListener("mouseout", mouseOutHandler);
      });

      //загрузка изображений с превью в модалке

      const addImgHandler = () => {
         const selectedFile = inputImg.files.item(0);
         const reader = new FileReader();
         reader.readAsDataURL(selectedFile);
         reader.onload = function (event) {
            for (const item of previewImages) {
               const img = item.querySelector("img");

               if (!img.hasAttribute("src") || img.getAttribute("src") === "") {
                  item.classList.add("active");
                  img.src = event.target.result;
                  imagesCounter();
                  break;
               }
            }
         };
      };

      inputImg.removeEventListener("change", addImgHandler);
      inputImg.addEventListener("change", addImgHandler);

      // удаление одного изображения
      removeBtns.forEach((btn) => {
         const removeImgHandler = () => {
            const wrapper = btn.closest(".upload__preview-box");
            const img = wrapper.querySelector("img");
            img.removeAttribute("src");
            imagesCounter();
            wrapper.classList.remove("active");
         };
         btn.removeEventListener("click", removeImgHandler);
         btn.addEventListener("click", removeImgHandler);
      });

      removeDataBtn.addEventListener("click", () => {
         const allTextareas = document.querySelectorAll("textarea");
         const icons = document.querySelectorAll(".rates__icon");
         const inputImg = document.querySelector(".upload__input");
         const textareaCounter = document.querySelector(".modal__textarea-limits");
         //чистка всех input & textarea
         inputImg.value = "";

         allTextareas.forEach((element) => {
            element.value = "";
            textareaCounter.textContent = "0/1000";
         });
         //чистка всех star-icons
         icons.forEach((element) => {
            element.classList = "rates__icon";
         });
         //удаление всех изображений
         previewImages.forEach((image) => {
            image.classList.remove("active");
            const tag = image.querySelector("img");
            tag.src = "";
         });
         imagesCounter();
      });
   }
};

const addMapModal = () => {
   const mapBtn = document.querySelectorAll("#map");
   const modalClass = "map-modal";

   if (!modalClass) return;

   const initMap = () => {
      initModal(modalClass);
      mapInitSecond();
      addFeedbackModal();
      //удаляем модалку активную перед показом карты
      const modal = document.querySelector(`.is-correct-adress`);
      if (modal) {
         modal.classList.remove("active");
      }
   };

   mapBtn?.forEach((btn) => {
      btn.addEventListener("click", initMap);
   });
};

const modalsBox = document.querySelector(".modal__box");

const modals = {
   "filter-modal-1": `<div class="modal active filter-modal-1">
	<div class="modal__container">
	<button class="modal__close-btn"></button>
	<div class="modal__root">
	<div class="teg-list">
	<p class="heading2">Теги</p>
	
	<label class="teg-list__item">
		<input type="checkbox" />
		<button class="teg-list__check-btn"></button>
		<span class="text1">Новости кофе</span>
	</label>

	<label class="teg-list__item">
		<input type="checkbox" />
		<button class="teg-list__check-btn"></button>
		<span class="text1">Кофейная культура</span>
	</label>

	<label class="teg-list__item">
		<input type="checkbox" />
		<button class="teg-list__check-btn"></button>
		<span class="text1">События</span>
	</label>

	<label class="teg-list__item">
		<input type="checkbox" />
		<button class="teg-list__check-btn"></button>
		<span class="text1">Новости кофеен</span>
	</label>

	<label class="teg-list__item">
		<input type="checkbox" />
		<button class="teg-list__check-btn"></button>
		<span class="text1">Полезные советы</span>
	</label>
</div>

<div class="modal__btns">
	<button class="square-btn blue-square-btn">
		<span>Применить</span>
	</button>

	<button
		class="btn"
		id="clear-filter">
		<span>Очистить</span>
	</button>
</div>
		</div>
	</div>
		</div>`,
   "filter-modal": `<div class="modal active filter-modal">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root"><div class="teg-list">
		<p class="heading2">Теги</p>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Новости кофе</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Кофейная культура</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">События</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Новости кофеен</span>
		</label>

		<label class="teg-list__item">
			<input type="checkbox" />
			<button class="teg-list__check-btn"></button>
			<span class="text1">Полезные советы</span>
		</label>
	</div>

	<div class="modal__btns">
		<button class="square-btn blue-square-btn">
			<span>Применить</span>
		</button>

		<button
			class="btn"
			id="clear-filter">
			<span>Очистить</span>
		</button>
	</div></div>
	</div>
  	</div>`,
   "is-correct-adress": `<div class="modal active is-correct-adress">
<div class="modal__container">
	<button class="modal__close-btn"></button>
	<div class="modal__root">
		<p class="heading2">Вы здесь находитесь?</p>
<div class="map-block__form-adress-wrapper">
<div class="map-block__form-adress">
	<span class="map-block__form-adress-value">
		Москва, ул. 1-й Старомытищенский пр-д, 15к1,
	</span>

	<div class="map-block__form-adress-remove">
		
	</div>
</div>
<div class="map-block__identify-box">
	<p>Определить местоположение</p>
</div>
</div>

<div class="modal__btns modal__btns--center">
<button class="square-btn blue-square-btn">
	<span>да</span>
</button>

<button class="arrow-link" id="map">
	<span>другое местоположение</span>
</button>
</div>

	</div>
</div>
  	</div>`,
   "map-modal": `
	<div class="modal active map-modal">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
			<div class="map-block">
			<div class="map-block__search-box">
				<p class="heading4 map-block__search-title">Адреса ресторанов</p>
				<div class="search-block search-block--long">
					<div>
						<input
							class="search-block__input"
							type="text"
							placeholder="Поиск" />
						<button class="search-block__enter-icon">
									<svg class="arrow-right">
										<use xlink:href="sprite.svg#arrow-right" />
									</svg>
								</button>
						</div>
					</div>

					<ul class="map-block__search-list">
						<li class="map-block__search-item active">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">БЦ «Валлекс»</p>
								<p class="map-block__search-item-text">Москва,</p>
								<p class="map-block__search-item-text">
									Старокалужское ш. 62, 1ый этаж
								</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Москва,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 69
								</p>
								<p class="map-block__search-item-text">Москва,</p>
								<p class="map-block__search-item-text">
									Севастопольский пр-д, д.40, с.1
								</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 148
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">3-й квартал, д.27</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>

						<li class="map-block__search-item">
							<div class="map-block__search-item-top">
								<p class="map-block__search-item-title">
									Детская поликлиника № 130
								</p>
								<p class="map-block__search-item-text">Капотня,</p>
								<p class="map-block__search-item-text">ул.Крылатские Холмы, 5</p>
							</div>

							<div class="map-block__search-item-bottom">
								<div class="map-block__search-item-time">
									<span>08-22</span>
								</div>

								<div
									href="#"
									class="arrow-link">
									<span>на карте</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div
					class="map-block__map-box"
					id="root">
					<div class="modal modal-map">
						<div class="modal__container">
							<button class="modal__close-btn"></button>
							<div class="modal-map__swiper swiper">
								<div class="swiper-wrapper">
									<div class="swiper-slide modal-map__swiper-item">
										<img
											src="./src/images/modal-map-img-1.png"
											alt="" />
									</div>

									<div class="swiper-slide modal-map__swiper-item">
										<img
											src="./src/images/modal-map-img-1.png"
											alt="" />
									</div>

									<div class="swiper-slide modal-map__swiper-item">
										<img
											src="./src/images/modal-map-img-1.png"
											alt="" />
									</div>
								</div>
								<div class="swiper-pagination modal-map__swiper-pagination"></div>
							</div>

							<div class="modal-map__content">
								<p class="modal-map__content-title">Детская поликлиника № 118</p>
								<div class="modal-map__content-disc">
									<div class="modal-map__content-adress">
										<p>Москва, 2-й Старомытищинский пр-д., д, 123, корп. 1</p>
									</div>

									<div class="modal-map__content-time">
										<span>08-22</span>
									</div>

									<div class="modal-map__content-pass">
										<span>Наличие пропуска:</span>
										<strong>Нет</strong>
									</div>

									<a
										href="tel:+74952121059"
										class="modal-map__content-tel">
										<span>+7 (495) 212 10 59</span>
									</a>
								</div>

								<button
									class="arrow-link " id="left-feedback" >
									<span>оставить отзыв</span>
									<svg class="arrow-link__icon">
										<use
											xlink:href="./sprite.svg#standart-arrow-right" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				</div>
						</div>
		</div> `,
   "feedback-modal": `<div class="modal active feedback-modal">
		<div class="modal__container">
			<button class="modal__close-btn"></button>
			<div class="modal__root">
				<p class="heading2">Отзыв к кофейне в БЦ «Валлекс»</p>
	
				<div class="rates">
					<p class="rates__title">Оцените</p>
	
					<div class="rates__icons-wrapper">
						<svg class="rates__icon">
							<use xlink:href="./sprite.svg#star" />
						</svg>
						<svg class="rates__icon">
							<use xlink:href="./sprite.svg#star" />
						</svg>
						<svg class="rates__icon">
							<use xlink:href="./sprite.svg#star" />
						</svg>
						<svg class="rates__icon">
							<use xlink:href="./sprite.svg#star" />
						</svg>
						<svg class="rates__icon">
							<use xlink:href="./sprite.svg#star" />
						</svg>
					</div>
				</div>
	
				<form class="modal__form">
					<div
						class="input-container modal__textarea-medium input-textarea-wrapper">
						<textarea
							id="textarea3"
							class="input input-textarea"
							placeholder="Расскажите о продукте"
							maxlength="1000"></textarea>
						<label
							for="textarea3"
							class="input-label">
							Расскажите о продукте
						</label>
						<span class="modal__textarea-limits">0/1000</span>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
					</div>
				</form>
	
				<div class="upload">
					<p class="upload__title">Загрузите до 5 фотографий</p>
					<div class="upload__content">
						<div class="upload__box">
							<div class="upload__preview-box">
								<img alt="" />
								<span class="upload__preview-box-remove"></span>
							</div>
	
							<div class="upload__preview-box">
								<img alt="" />
								<span class="upload__preview-box-remove"></span>
							</div>
	
							<div class="upload__preview-box">
								<img alt="" />
								<span class="upload__preview-box-remove"></span>
							</div>
	
							<div class="upload__preview-box">
								<img alt="" />
								<span class="upload__preview-box-remove"></span>
							</div>
	
							<div class="upload__preview-box">
								<img alt="" />
								<span class="upload__preview-box-remove"></span>
							</div>
	
							<div class="upload__input-label">
								<input
									type="file"
									class="upload__input"
									accept="image/*" />
							</div>
						</div>
	
						<div class="upload__info">
							<strong>Нажмите на область с иконкой</strong>
							<span>Формат JPG, JPEG, PNG, BMP, GIF</span>
						</div>
					</div>
				</div>
	
				<div class="modal__btns modal__btns--center">
					<button
						class="square-btn blue-square-btn"
						id="feedback-confirmation">
						<span>отправить</span>
					</button>
	
					<button
						class="arrow-link"
						id="remove-feedback-data">
						<span>Отменить</span>
					</button>
				</div>
			</div>
		</div>
	</div>`,
   "request-sended-modal": `<div class="modal active request-sended-modal">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
		<p class="heading2">Заявка отправлена!</p>
		<p class="modal__message">Мы ответим Вам в ближайщее время</p>
		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn">
				<span>закрыть</span>
			</button>
		</div>
	</div>
	</div>`,
   "text-us": `
	<div class="modal active text-us">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">

		<p class="heading2">Напишите нам</p>
		<form class="modal__form">
			<div class="input-container modal__input-large">
				<input
					type="text"
					id="name5"
					class="input input-name"
					placeholder="Ваше Имя" />
				<label
					for="name5"
					class="input-label">
					Ваше Имя
				</label>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
				<div class="input-status">Неверный формат</div>
			</div>
		
			<div class="input-container modal__input-large">
				<input
					type="text"
					id="email"
					class="input input-email"
					placeholder="Email" />
				<label
					for="email"
					class="input-label">
					Email
				</label>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
				<div class="input-status">Неверный формат</div>
			</div>
		
			<div
				class="input-container modal__textarea-medium input-textarea-wrapper">
				<textarea
					
					id="textarea2"
					class="input input-textarea"
					placeholder="Комментарий"
					maxlength="1000"></textarea>
				<label
					for="textarea2"
					class="input-label">
					Комментарий
				</label>
				<span class="modal__textarea-limits">0/1000</span>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
			</div>
		</form>
		
		<div class="modal__btns modal__btns--between">
			<div class="account-main__left-policy menu">
				<p>Нажимая на кнопку, вы принимаете</p>
				<a href="#">условия пользовательского соглашения</a>
			</div>
			<button class="square-btn blue-square-btn" id='text-us-confirmation'>
				<span>отправить</span>
			</button>
		</div>
		</div>
	</div>
	</div>`,
   "unavailable-modal": `<div class="modal unavailable-modal active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root"><div class="modal__content-box">
	<p class="heading2">Данные товары недоступны для заказа</p>
	<div class="modal__beige-box">
		<li class="cart__main-item">
			<div class="cart__main-item-img">
				<img
					src="./src/images/cart-sample-img.png"
					alt="" />
			</div>
	
			<div class="cart__main-item-text">
				<a href="">Espresso Seasonal</a>
				<span class="text1">500 г</span>
				<p class="text1">Дополнительный текст</p>
			</div>
	
			<div class="cart__main-item-count">1 шт</div>
	
			<div class="cart__main-item-price">
				<div class="cart__main-item-value">
					<strong class="heading4">600</strong>
					<span class="text2">₽</span>
				</div>
	
				<span class="cart__main-cart-item"></span>
			</div>
		</li>
	
		<li class="cart__main-item">
			<div class="cart__main-item-img">
				<img
					src="./src/images/cart-sample-img.png"
					alt="" />
			</div>
	
			<div class="cart__main-item-text">
				<a href="">Espresso Seasonal</a>
				<span class="text1">500 г</span>
				<p class="text1">Дополнительный текст</p>
			</div>
	
			<div class="cart__main-item-count">1 шт</div>
	
			<div class="cart__main-item-price">
				<div class="cart__main-item-value">
					<strong class="heading4">600</strong>
					<span class="text2">₽</span>
				</div>
	
				<span class="cart__main-cart-item"></span>
			</div>
		</li>
	
		<li class="cart__main-item">
			<div class="cart__main-item-img">
				<img
					src="./src/images/cart-sample-img.png"
					alt="" />
			</div>
	
			<div class="cart__main-item-text">
				<a href="">Espresso Seasonal</a>
				<span class="text1">500 г</span>
				<p class="text1">Дополнительный текст</p>
			</div>
	
			<div class="cart__main-item-count">1 шт</div>
	
			<div class="cart__main-item-price">
				<div class="cart__main-item-value">
					<strong class="heading4">600</strong>
					<span class="text2">₽</span>
				</div>
	
				<span class="cart__main-cart-item"></span>
			</div>
		</li>
	</div>
	</div>
	
	<div class="modal__content-box">
	<p class="heading2">Похожие товары</p>
	<div class="catalog__content-box">
		<div class="catalog-card-1">
			<a
				href="/"
				class="catalog-card-1__img">
				<img
					src="./src/images/lil-cake-sample-1.png"
					alt="" />
			</a>
			<div class="catalog-card-1__descr">
				<div class="catalog-card-1__imgless">
					<div class="catalog-card-1__imgless-box">
						<span>новинка</span>
						<strong>Блюдо на фотосессии прямо сейчас</strong>
					</div>
				</div>
	
				<div class="catalog-card-1__info">
					<a
						href="/"
						class="catalog-card-1__title heading4">
						Пироженое «Фруктовое»
					</a>
	
					<div class="catalog-card__price">
						<div class="catalog-card__sale">
							<div class="catalog-card__sale-price">
								240
								<span>₽</span>
							</div>
							<div class="catalog-card__weight">/ 100 г</div>
						</div>
					</div>
				</div>
				<div
					class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
			</div>
		</div>
	
		<div class="catalog-card-1">
			<a
				href="/"
				class="catalog-card-1__img">
				<img
					src="./src/images/lil-cake-sample-2.png"
					alt="" />
			</a>
			<div class="catalog-card-1__descr">
				<div class="catalog-card-1__imgless">
					<div class="catalog-card-1__imgless-box">
						<span>новинка</span>
						<strong>Блюдо на фотосессии прямо сейчас</strong>
					</div>
				</div>
	
				<div class="catalog-card-1__info">
					<a
						href="/"
						class="catalog-card-1__title heading4">
						Пироженое «Фруктовое»
					</a>
	
					<div class="catalog-card__price">
						<div class="catalog-card__sale">
							<div class="catalog-card__sale-price">
								240
								<span>₽</span>
							</div>
							<div class="catalog-card__weight">/ 100 г</div>
						</div>
					</div>
				</div>
				<div
					class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
			</div>
		</div>
	
		<div class="catalog-card-1">
			<a
				href="/"
				class="catalog-card-1__img">
				<img
					src="./src/images/lil-cake-sample-3.png"
					alt="" />
			</a>
			<div class="catalog-card-1__descr">
				<div class="catalog-card-1__imgless">
					<div class="catalog-card-1__imgless-box">
						<span>новинка</span>
						<strong>Блюдо на фотосессии прямо сейчас</strong>
					</div>
				</div>
	
				<div class="catalog-card-1__info">
					<a
						href="/"
						class="catalog-card-1__title heading4">
						Пироженое «Шоколадное»
					</a>
	
					<div class="catalog-card__price">
						<div class="catalog-card__sale">
							<div class="catalog-card__sale-price">
								240
								<span>₽</span>
							</div>
							<div class="catalog-card__weight">/ 100 г</div>
						</div>
					</div>
				</div>
				<div
					class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
			</div>
		</div>
	
		<div class="catalog-card-1">
			<a
				href="/"
				class="catalog-card-1__img">
				<img
					src="./src/images/lil-cake-sample-4.png"
					alt="" />
			</a>
			<div class="catalog-card-1__descr">
				<div class="catalog-card-1__imgless">
					<div class="catalog-card-1__imgless-box">
						<span>новинка</span>
						<strong>Блюдо на фотосессии прямо сейчас</strong>
					</div>
				</div>
	
				<div class="catalog-card-1__info">
					<a
						href="/"
						class="catalog-card-1__title heading4">
						Пироженое «сливочное»
					</a>
	
					<div class="catalog-card__price">
						<div class="catalog-card__sale">
							<div class="catalog-card__sale-price">
								240
								<span>₽</span>
							</div>
							<div class="catalog-card__weight">/ 100 г</div>
						</div>
					</div>
				</div>
				<div
					class="catalog-card__add-to-cart catalog-card-1__add-to-cart"></div>
			</div>
		</div>
	</div>
	</div>
	
	<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>закрыть</span>
	</button>
	</div>
	</div>
	</div>
	</div>`,
   "personal-info-modal": `
	<div class="modal personal-info-modal active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
		<p class="heading2">Персональная информация</p>
<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name"
			class="input input-name"
			placeholder="Имя" />
		<label
			for="name"
			class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name1"
			class="input input-name"
			placeholder="Фамилия" />
		<label
			for="name1"
			class="input-label">
			Фамилия
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="email"
			class="input input-email"
			placeholder="Email" />
		<label
			for="email"
			class="input-label">
			Email
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="number"
			id="tel"
			class="input input-tel"
			placeholder="Телефон" />
		<label
			for="tel"
			class="input-label">
			Телефон
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn">
		<span>сохранить изменения</span>
	</button>
</div>
		</div>
		</div>
		</div>`,
   "chage-password-modal": `<div class="modal chage-password-modal active">
		<div class="modal__container">
			<button class="modal__close-btn"></button>
			<div class="modal__root">
	<p class="heading2">Изменить пароль</p>
	
		<form class="modal__form">
			<div class="input-container modal__input-large">
				<input
					type="text"
					id="pass"
					class="input"
					placeholder="Старый пароль" />
				<label
					for="pass"
					class="input-label">
					Старый пароль
				</label>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
				<div class="input-status">Неверный формат</div>
	
				
			</div>
	
			<div class="input-container modal__input-medium">
				<input
					type="text"
					id="newpass"
					class="input"
					placeholder="Новый пароль" />
				<label
					for="newpass"
					class="input-label">
					Новый пароль
				</label>
				<div class="icon success"></div>
				<div class="icon invalid"></div>
				<div class="input-status">Неверный формат</div>
	
				
			</div>
	
			<div class="input-container modal__input-medium">
				<input
					type="text"
					id="reppas"
					class="input"
					placeholder="Повторите пароль" />
				<label
					for="reppas"
					class="input-label">
					Повторите пароль
				</label>
				<div class="input-status">Неверный формат</div>
	
				<div class="icon success"></div>
				<div class="icon invalid"></div>
				
			</div>
		</form>
	
		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn">
				<span>сохранить изменения</span>
			</button>
	
			<div class="account-main__left-policy menu">
				<a href="forget-password.html">Забыли пароль?</a>
			</div>
		</div>
			</div>
		</div>
	</div>`,
   "add-adress": `<div class="modal add-adress active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
	<p class="heading2">Добавить адрес</p>
	
				<form class="modal__form">
					<div class="input-container modal__input-medium">
						<input
							type="text"
							id="city"
							class="input"
							placeholder="Город" />
						<label
							for="city"
							class="input-label">
							Город
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
	
					<div class="input-container modal__input-medium">
						<input
							type="text"
							id="street"
							class="input"
							placeholder="Улица" />
						<label
							for="street"
							class="input-label">
							Улица
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
	
					<div class="input-container modal__input-small">
						<input
							type="text"
							id="block"
							class="input"
							placeholder="Дом" />
						<label
							for="block"
							class="input-label">
							Дом
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
	
					<div class="input-container modal__input-small">
						<input
							type="text"
							id="flor"
							class="input"
							placeholder="Этаж" />
						<label
							for="flor"
							class="input-label">
							Этаж
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
	
					<div class="input-container modal__input-small">
						<input
							type="text"
							id="apart"
							class="input"
							placeholder="Квартира" />
						<label
							for="apart"
							class="input-label">
							Квартира
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
	
					<div class="input-container modal__input-large">
						<input
							type="text"
							id="description"
							class="input"
							placeholder="Комментарий к адресу" />
						<label
							for="description"
							class="input-label">
							Комментарий к адресу
						</label>
						<div class="icon success"></div>
						<div class="icon invalid"></div>
						<div class="input-status">Неверный формат</div>
					</div>
				</form>
	
				<div class="modal__btns modal__btns--center">
					<button class="square-btn blue-square-btn">
						<span>сохранить изменения</span>
					</button>
				</div>
				</div>
				</div>
				</div>`,
   "edit-adress": `<div class="modal edit-adress active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">

		<p class="heading2">Редактировать адрес</p>

		<div class="section-tags__container">
			<ul class="section-tags">
				<li class="section-tags__item">
					<button
						class="section-tags__item-btn active"
						data-path="address-1">
						адрес 1
					</button>
				</li>
				<li class="section-tags__item">
					<button
						class="section-tags__item-btn"
						data-path="address-2">
						адрес 2
					</button>
				</li>
			</ul>
		</div>

		<div
			class="delivery-main__accordion accordion active"
			data-target="address-1">
			<form class="modal__form">
				<div class="input-container modal__input-medium">
					<input
						type="text"
						id="city"
						class="input"
						placeholder="Город" />
					<label
						for="city"
						class="input-label">
						Город
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-medium">
					<input
						type="text"
						id="street"
						class="input"
						placeholder="Улица" />
					<label
						for="street"
						class="input-label">
						Улица
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="block"
						class="input"
						placeholder="Дом" />
					<label
						for="block"
						class="input-label">
						Дом
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="flor"
						class="input"
						placeholder="Этаж" />
					<label
						for="flor"
						class="input-label">
						Этаж
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="apart"
						class="input"
						placeholder="Квартира" />
					<label
						for="apart"
						class="input-label">
						Квартира
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-large">
					<input
						type="text"
						id="description"
						class="input"
						placeholder="Комментарий к адресу" />
					<label
						for="description"
						class="input-label">
						Комментарий к адресу
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>
			</form>
		</div>

		<div
			class="delivery-main__accordion accordion"
			data-target="address-2">
			<form class="modal__form">
				<div class="input-container modal__input-medium">
					<input
						type="text"
						id="city"
						class="input"
						placeholder="Город" />
					<label
						for="city"
						class="input-label">
						Город
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-medium">
					<input
						type="text"
						id="street"
						class="input"
						placeholder="Улица" />
					<label
						for="street"
						class="input-label">
						Улица
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="block"
						class="input"
						placeholder="Дом" />
					<label
						for="block"
						class="input-label">
						Дом
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="flor"
						class="input"
						placeholder="Этаж" />
					<label
						for="flor"
						class="input-label">
						Этаж
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-small">
					<input
						type="text"
						id="apart"
						class="input"
						placeholder="Квартира" />
					<label
						for="apart"
						class="input-label">
						Квартира
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>

				<div class="input-container modal__input-large">
					<input
						type="text"
						id="description"
						class="input"
						placeholder="Комментарий к адресу" />
					<label
						for="description"
						class="input-label">
						Комментарий к адресу
					</label>
					<div class="icon success"></div>
					<div class="icon invalid"></div>
					<div class="input-status">Неверный формат</div>
				</div>
			</form>
		</div>

		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn">
				<span>сохранить изменения</span>
			</button>
			<button class="arrow-link">
				<span>Удалить</span>
			</button>
		</div>
		
	</div>
	</div>
	</div>`,
   "vacancy-modal": `<div class="modal vacancy-modal active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">

<p class="heading2">Отклик на вакансию</p>

<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input type="text" id="name" class="input input-name" placeholder="Имя">
		<label for="name" class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input type="number" id="vac-tel" class="input input-tel" placeholder="Номер телефона">
		<label for="vac-tel" class="input-label">
			Номер телефона
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-large">
		<input type="text" id="vac-link" class="input" placeholder="Ссылка на резюме">
		<label for="vac-link" class="input-label">
			Ссылка на резюме
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn" id="vacancy-confirmation-btn">
		<span>отправить</span>
	</button>
	</div>
	</div>
	</div>
	</div>`,
   "promotion-modal": `<div class="modal vacancy-modal active">
		<div class="modal__container">
			<button class="modal__close-btn"></button>
			<div class="modal__root">
			<p class="heading2">Акция</p>
					<div class="news-main__item">
						<img
							src="./src/images/news-img2.png"
							alt=""
							class="news-main__item-img" />
						<div class="news-main__item-text">
							<p class="news-main__item-heading heading4">
								Скидка для второго и следующего заказов
							</p>
							<div class="news-main__item-description menu">
								<p>
									Только в течение ограниченного времени мы предлагаем вам
									адреналиновую акцию: купите одну и получите вторую бесплатно на
									любой кофе среднего размера на ваш выбор! Пришло время действовать
									и погрузиться в мир смелых вкусов и бодрящих ароматов.
								</p>
							</div>
							<div class="news-main__item-bottom">
								<p class="news-main__item-date btns-caps">до 01.12.23</p>
								<a
									href="#"
									class="news-main__item-name btns-caps">
									Акции
								</a>
							</div>
						</div>
					</div>
					</div>
		</div>
		</div>`,
   "calculator-first-modal": `
	<div class="modal personal-info-modal active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
		<p class="heading2">Введите ваши данные</p>
<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input
			type="text"
			id="name"
			class="input input-name"
			placeholder="Имя" />
		<label
			for="name"
			class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input
			type="number"
			id="tel"
			class="input input-tel"
			placeholder="Телефон" />
		<label
			for="tel"
			class="input-label">
			Телефон
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn calclulcator-first-modal-btn">
		<span>отправить заявку</span>
	</button>
</div>
		</div>
		</div>
		</div>`,
   "calculator-second-modal": `
	<div class="modal personal-info-modal active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root">
		<p class="heading2">Заявка успешно отправлена</p>

		<div class="modal__btns modal__btns--center">
			<button class="square-btn blue-square-btn">
				<span>вернуться на сайт</span>
			</button>
		</div>
		</div>
		</div>
		</div>
	`,
   partnership: `<div class="modal partnership active">
	<div class="modal__container">
		<button class="modal__close-btn"></button>
		<div class="modal__root"><p class="heading2">Регистрация</p>

<form class="modal__form">
	<div class="input-container modal__input-medium">
		<input type="text" id="name" class="input input-name" placeholder="Имя">
		<label for="name" class="input-label">
			Имя
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-medium">
		<input type="tel" id="tel" class="input input-tel" placeholder="Телефон">
		<label for="tel" class="input-label">
			Телефон
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>

	<div class="input-container modal__input-large">
		<input type="email" id="email" class="input input-email" placeholder="Дом">
		<label for="email" class="input-label">
			Email
		</label>
		<div class="icon success"></div>
		<div class="icon invalid"></div>
		<div class="input-status">Неверный формат</div>
	</div>
</form>

<div class="modal__btns modal__btns--center">
	<button class="square-btn blue-square-btn" id="partnership-confirmation-btn">
		<span>Зарегистрироваться</span>
	</button>
</div></div>
	</div>
</div>`,

   closeHandler: () => {
      closeModalHandler();
   },
   filterHandler: () => {
      clearFilter();
   },
   addMap: () => {
      addMapModal();
   },
};

//обычное добавление модалки + добавление функции закрытия
const initModal = (modalClass) => {
   const modal = document.querySelector(`.${modalClass}`);
   const allModals = document.querySelectorAll(".modal");
   allModals.forEach((el) => {
      el.classList.remove("active");
   });
   if (modal) {
      modal.classList.add("active");
      return;
   }
   modalsBox.innerHTML += modals[modalClass];
   modals.closeHandler();
   initValidation();
};

//добавление модалки новостей (фильтр)
const filterBtnNews = document.querySelector("#filter-modal-1");
if (filterBtnNews) {
   const modalClass = "filter-modal-1";

   filterBtnNews.addEventListener("click", () => {
      initModal(modalClass);
      modals.filterHandler();
   });
}

//добавление модалки категорий (фильтр)
const filterBtnCategory = document.querySelector("#filter-modal");
if (filterBtnCategory) {
   const modalClass = "filter-modal";
   filterBtnCategory.addEventListener("click", () => {
      initModal(modalClass);
      modals.filterHandler();
   });
}

//добавим модалку для отзывов при вызове из модалки
const addFeedbackModal = () => {
   const wrapper = document.querySelector(".map-block__map-box");
   const feedbackBtn = wrapper?.querySelector("#left-feedback");

   if (feedbackBtn) {
      const modalClass = "feedback-modal";

      const feedbackHandler = (e) => {
         const isCorrect = e.currentTarget === feedbackBtn;
         if (isCorrect) {
            initModal(modalClass);
            initStarsRate();
         }
      };
      feedbackBtn.removeEventListener("click", feedbackHandler);
      feedbackBtn.addEventListener("click", feedbackHandler);
      return;
   }
};
addFeedbackModal();

//добавление модалки уточнения адреса
const refiningAddressBtn = document.querySelector("#geo");
if (refiningAddressBtn) {
   const modalClass = "is-correct-adress";
   refiningAddressBtn.addEventListener("click", () => {
      initModal(modalClass);
      modals.addMap();
   });
}

//добавление модалки отправить заявку
const sendedModalHandler = () => {
   const wrapper = document.querySelectorAll(".modal__container");
   const modalClass = "request-sended-modal";

   const clickHandler = () => {
      initModal(modalClass);
   };

   wrapper.forEach((box) => {
      const btn = box.querySelector("#text-us-confirmation");
      btn.removeEventListener("click", clickHandler);
      btn.addEventListener("click", clickHandler);
   });
};
sendedModalHandler();

const sendModalHandlerSecond = () => {
   const btns = document.querySelectorAll(".request-btn");
   const modalClass = "request-sended-modal";

   const clickHandler = (e) => {
      e.preventDefault();
      initModal(modalClass);
   };

   btns.forEach((btn) => {
      btn.removeEventListener("click", clickHandler);
      btn.addEventListener("click", clickHandler);
   });
};
sendModalHandlerSecond();

//добавление модалки оставить заявку
const sendRequestBtns = document.querySelectorAll("#text-us");
if (sendRequestBtns) {
   const modalClass = "text-us";
   sendRequestBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
         initTextvalueCounter();
         sendedModalHandler();
      });
   });
}

//добавление модалки с недоступными товарами (корзина)
const unavailableBtns = document.querySelectorAll("#unavailable-btn");
if (unavailableBtns) {
   const modalClass = "unavailable-modal";
   unavailableBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}

//модалка редактирования персональной информации
const editProfileDataBtns = document.querySelectorAll("#red-prof");
if (editProfileDataBtns) {
   const modalClass = "personal-info-modal";
   editProfileDataBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}
//модалка сменить пароль
const changePassBtns = document.querySelectorAll("#change-pass");
if (changePassBtns) {
   const modalClass = "chage-password-modal";
   changePassBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}
//модалка добавить адрес
const addAdressBtns = document.querySelectorAll("#add-adress");
if (addAdressBtns) {
   const modalClass = "add-adress";
   addAdressBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}

//модалка изменить адресс
const editAdressBtns = document.querySelectorAll("#edit-adress");
if (editAdressBtns) {
   const modalClass = "edit-adress";
   editAdressBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);

         const wrapper = document.querySelector(".edit-adress");
         const tagButtons = wrapper.querySelectorAll(".section-tags__item-btn");
         const tagBlocks = wrapper.querySelectorAll(".delivery-main__accordion");

         const tabsHandler = (btn) => {
            btn.removeEventListener("click", tabsHandler);
            tagButtons.forEach((el) => el.classList.remove("active"));
            tagBlocks.forEach((el) => {
               el.classList.remove("active");
               el.classList.add("hide");
            });
            btn.classList.add("active");
            const path = btn.dataset.path;
            tagBlocks.forEach((block) => {
               if (block.dataset.target === path) {
                  block.classList.add("active");
                  block.classList.remove("hide");
               }
            });
         };

         tagButtons.forEach((btn) => {
            btn.addEventListener("click", () => tabsHandler(btn));
         });
      });
   });
}

//модалка с отзывом на вакансию
const vacanciesBtns = document.querySelectorAll(".vacancy-btn");
if (vacanciesBtns) {
   const modalClass = "vacancy-modal";
   vacanciesBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}

//модалка с акцией, пока что не добавлена никуда, укажите кнопку по нужному id.
const stocksBtns = document.querySelectorAll("#promotion-btn");
if (stocksBtns) {
   const modalClass = "vacancy-modal";
   stocksBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}

//модалка регистрации в личном кабинете при клике "Зарегистрироваться" в какой-то акции
const partRegBtns = document.querySelectorAll("#partnership-btn");
if (partRegBtns) {
   const modalClass = "partnership";
   partRegBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
         initModal(modalClass);
      });
   });
}

// модалка калькулятора с данными

const sendApplicationBtn = document.querySelector(".send-application");
const sendCalculatorDataBtn = document.querySelector(".calclulcator-first-modal-btn");

if (sendApplicationBtn) {
   const firstModalClass = "calculator-first-modal";
   const secondModalClass = "calculator-second-modal";

   sendApplicationBtn.addEventListener("click", () => {
      initModal(firstModalClass);

      const sendCalculatorDataBtn = document.querySelector(".calclulcator-first-modal-btn");

      sendCalculatorDataBtn.addEventListener("click", () => {
         initModal(secondModalClass);
      });
   });
}
