document.addEventListener('DOMContentLoaded', () => {
  // burger
  // const burgerBtn = document.querySelector('.burger');
  // const navMenu = document.querySelector('.header-nav');
  const body = document.querySelector('.page-body');
  // const menuLinks = document.querySelectorAll('.header-nav a');

  // burgerBtn.addEventListener('click', () => {
  //   burgerBtn.classList.toggle('burger--active');
  //   navMenu.classList.toggle('header-nav--active');
  //   body.classList.toggle('dis-scroll');
  // });

  // menuLinks.forEach((link) => {
  //   link.addEventListener('click', () => {
  //     burgerBtn.classList.remove('burger--active');
  //     navMenu.classList.remove('header-nav--active');
  //     body.classList.remove('dis-scroll');
  //   });
  // });
  // burger

  // scroll

  // const header = document.querySelector('header');
  // const links = document.querySelectorAll('a[href^="#"]');

  // links.forEach((link) => {
  //   link.addEventListener('click', (event) => {
  //     event.preventDefault();

  //     const targetId = link.getAttribute('href');
  //     const targetSection = document.querySelector(targetId);
  //     const headerHeight = header ? header.offsetHeight : 0;

  //     if (targetSection) {
  //       const targetPosition =
  //         targetSection.getBoundingClientRect().top +
  //         window.scrollY -
  //         headerHeight -
  //         30;

  //       window.scrollTo({
  //         top: targetPosition,
  //         behavior: 'smooth',
  //       });
  //     }
  //   });
  // });

  // scroll

  // Инициализация Swiper
  const swiper = new Swiper('.hero-slider', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true, // плавное затухание между слайдами
    },
    navigation: {
      nextEl: '.hero-slider-button-next',
      prevEl: '.hero-slider-button-prev',
    },
    loop: false, // Отключаем loop для точной синхронизации
    on: {
      slideChange: function () {
        // Подсвечиваем активный элемент в header-pagination
        const items = document.querySelectorAll('.header-pagination__item');
        items.forEach((item) => item.classList.remove('active'));
        items[this.activeIndex].classList.add('active');
      },
    },
  });

  // Обработчик кликов по header-pagination
  document.querySelectorAll('.header-pagination__item').forEach((item) => {
    item.addEventListener('click', () => {
      const slideIndex = parseInt(item.getAttribute('data-slide'));
      swiper.slideTo(slideIndex); // Теперь swiper определен
    });
  });

  // Устанавливаем первый элемент активным при загрузке
  document
    .querySelector('.header-pagination__item[data-slide="0"]')
    .classList.add('active');

  const documentsSlider = new Swiper('.documents-slider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 60,
  });
  const tictokSlider = new Swiper('.tictok-slider', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 60,
  });

  // modal

  const openModalButtons = document.querySelectorAll(
    '.equipment-wrapper__item'
  );
  const modals = document.querySelectorAll('.equipment-modal');

  // Проверяем наличие элементов
  if (!openModalButtons.length || !modals.length) {
    console.error('Элементы не найдены');
    return;
  }

  // Функция для закрытия всех модальных окон
  function closeAllModals() {
    modals.forEach((modal) => {
      modal.classList.remove('active');
    });
    body.classList.remove('dis-scroll');
  }

  // Открытие модального окна
  openModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-id');
      const targetModal = document.querySelector(
        `.equipment-modal[data-modal-id="${modalId}"]`
      );

      if (targetModal) {
        closeAllModals(); // Закрываем все модальные окна перед открытием нового
        targetModal.classList.add('active');
        body.classList.add('dis-scroll');

        // Инициализация Swiper для конкретного модального окна
        new Swiper(targetModal.querySelector('.equipment-modal__slider'), {
          navigation: {
            nextEl: targetModal.querySelector('.equipment-modal__btn--next'),
            prevEl: targetModal.querySelector('.equipment-modal__btn--prev'),
          },
          loop: true,
        });
      }
    });
  });

  // Закрытие модального окна по кнопке .equipment-modal__close
  modals.forEach((modal) => {
    const closeModalBtn = modal.querySelector('.equipment-modal__close');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        closeAllModals();
      });
    }

    // Закрытие при клике вне слайдера
    modal.addEventListener('click', (e) => {
      const modalSlider = modal.querySelector('.equipment-modal__slider');
      if (!modalSlider.contains(e.target)) {
        closeAllModals();
      }
    });
  });

  // Закрытие модального окна по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  // modal
  AOS.init();
});
