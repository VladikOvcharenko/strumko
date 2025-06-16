document.addEventListener('DOMContentLoaded', () => {
  // burger
  const burgerBtn = document.querySelector('.burger');
  const navMenu = document.querySelector('.header-nav');
  const body = document.querySelector('.page-body');
  const menuLinks = document.querySelectorAll('.header-nav a');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('burger--active');
    navMenu.classList.toggle('active');
    body.classList.toggle('dis-scroll');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('burger--active');
      navMenu.classList.remove('active');
      body.classList.remove('dis-scroll');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('active');
      body.classList.remove('dis-scroll');
    }
  });

  const swiper = new Swiper('.hero-slider', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: '.hero-slider-button-next',
      prevEl: '.hero-slider-button-prev',
    },
    loop: false,
    on: {
      slideChange: function () {
        const items = document.querySelectorAll('.header-pagination__item');
        items.forEach((item) => item.classList.remove('active'));
        items[this.activeIndex].classList.add('active');
      },
    },
  });

  document.querySelectorAll('.header-pagination__item').forEach((item) => {
    item.addEventListener('click', () => {
      const slideIndex = parseInt(item.getAttribute('data-slide'));
      swiper.slideTo(slideIndex);
    });
  });

  document
    .querySelector('.header-pagination__item[data-slide="0"]')
    .classList.add('active');

  const documentsSlider = new Swiper('.documents-slider', {
    loop: true,
    spaceBetween: 60,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: '.documents-slider__btn--next',
      prevEl: '.documents-slider__btn--prev',
    },
  });
  const tictokSlider = new Swiper('.tictok-slider', {
    loop: true,
    spaceBetween: 60,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: '.tictok-slider__btn--next',
      prevEl: '.tictok-slider__btn--prev',
    },
  });

  // modal

  const openModalButtons = document.querySelectorAll(
    '.equipment-wrapper__open-modal'
  );

  const modals = document.querySelectorAll('.equipment-modal');

  if (!openModalButtons.length || !modals.length) {
    console.error('Элементы не найдены');
    return;
  }

  function closeAllModals() {
    modals.forEach((modal) => {
      modal.classList.remove('active');
    });
    body.classList.remove('dis-scroll');
  }

  openModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal-id');
      const targetModal = document.querySelector(
        `.equipment-modal[data-modal-id="${modalId}"]`
      );

      if (targetModal) {
        closeAllModals();
        targetModal.classList.add('active');
        body.classList.add('dis-scroll');

        new Swiper(targetModal.querySelector('.equipment-modal__slider'), {
          spaceBetween: 20,
          navigation: {
            nextEl: targetModal.querySelector('.equipment-modal__btn--next'),
            prevEl: targetModal.querySelector('.equipment-modal__btn--prev'),
          },
          loop: true,
        });
      }
    });
  });

  modals.forEach((modal) => {
    const closeModalBtn = modal.querySelector('.equipment-modal__close');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        closeAllModals();
      });
    }

    modal.addEventListener('click', (e) => {
      const modalSlider = modal.querySelector('.equipment-modal__slider');
      if (!modalSlider.contains(e.target)) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  // modal

  const proposalBtns = document.querySelectorAll('[data-proposal]');
  const collBtns = document.querySelectorAll('[data-coll]');

  // Находим модальные окна
  const proposalModal = document.getElementById('proposal');
  const collModal = document.getElementById('coll');

  // Находим кнопки закрытия внутри модалок
  const closeButtons = document.querySelectorAll('.contact-modal__close');

  // Функция для открытия модалки
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  }

  // Функция для закрытия модалки
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
  }

  // Открытие модалки "proposal" при клике на кнопки с data-proposal
  proposalBtns.forEach((btn) => {
    btn.addEventListener('click', () => openModal(proposalModal));
  });

  // Открытие модалки "coll" при клике на кнопки с data-coll
  collBtns.forEach((btn) => {
    btn.addEventListener('click', () => openModal(collModal));
  });

  // Закрытие модалок при клике на крестик
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.contact-modal');
      closeModal(modal);
    });
  });

  // Закрытие модалок при клике вне контента (на оверлей)
  [proposalModal, collModal].forEach((modal) => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeModal(this);
      }
    });
  });

  // Закрытие модалок при нажатии на Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      [proposalModal, collModal].forEach((modal) => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  AOS.init();
});
