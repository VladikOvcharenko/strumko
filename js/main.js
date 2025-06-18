document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    burgerBtn: document.querySelector('.burger'),
    navMenu: document.querySelector('.header-nav'),
    body: document.querySelector('.page-body'),
    menuLinks: document.querySelectorAll('.header-nav a'),
    openModalButtons: document.querySelectorAll(
      '.equipment-wrapper__open-modal'
    ),
    modals: document.querySelectorAll('.equipment-modal'),
    proposalBtns: document.querySelectorAll('[data-proposal]'),
    collBtns: document.querySelectorAll('[data-coll]'),
    proposalModal: document.getElementById('proposal'),
    collModal: document.getElementById('coll'),
    closeButtons: document.querySelectorAll('.contact-modal__close'),
  };

  const scrollUtils = {
    disable() {
      elements.body.classList.add('dis-scroll');
    },
    enable() {
      elements.body.classList.remove('dis-scroll');
    },
  };

  function initBurgerMenu() {
    if (!elements.burgerBtn || !elements.navMenu) return;

    const toggleMenu = () => {
      const isActive = elements.burgerBtn.classList.toggle('burger--active');
      elements.navMenu.classList.toggle('active', isActive);
      isActive ? scrollUtils.disable() : scrollUtils.enable();
    };

    const closeMenu = () => {
      elements.burgerBtn.classList.remove('burger--active');
      elements.navMenu.classList.remove('active');
      scrollUtils.enable();
    };

    elements.burgerBtn.addEventListener('click', toggleMenu);
    elements.menuLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initSliders() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      const swiper = new Swiper('.hero-slider', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
          nextEl: '.hero-slider-button-next',
          prevEl: '.hero-slider-button-prev',
        },
        loop: false,
        on: {
          slideChange() {
            const items = document.querySelectorAll('.header-pagination__item');
            items.forEach((item) => item.classList.remove('active'));
            if (items[this.activeIndex]) {
              items[this.activeIndex].classList.add('active');
            }
          },
        },
      });

      document.querySelectorAll('.header-pagination__item').forEach((item) => {
        item.addEventListener('click', () => {
          const slideIndex = parseInt(item.getAttribute('data-slide'));
          if (!isNaN(slideIndex)) {
            swiper.slideTo(slideIndex);
          }
        });
      });

      const firstItem = document.querySelector(
        '.header-pagination__item[data-slide="0"]'
      );
      if (firstItem) firstItem.classList.add('active');
    }

    const documentsSliderEl = document.querySelector('.documents-slider');
    if (documentsSliderEl) {
      new Swiper('.documents-slider', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        breakpoints: {
          600: { slidesPerView: 2, spaceBetween: 30 },
          900: { slidesPerView: 3, spaceBetween: 60 },
        },
        navigation: {
          nextEl: '.documents-slider__btn--next',
          prevEl: '.documents-slider__btn--prev',
        },
      });
    }

    const tiktokSliderEl = document.querySelector('.tictok-slider');
    if (tiktokSliderEl) {
      new Swiper('.tictok-slider', {
        loop: true,
        spaceBetween: 30,
        slidesPerView: 1,
        breakpoints: {
          600: { slidesPerView: 2, spaceBetween: 30 },
          900: { slidesPerView: 3, spaceBetween: 60 },
        },
        navigation: {
          nextEl: '.tictok-slider__btn--next',
          prevEl: '.tictok-slider__btn--prev',
        },
      });
    }
  }

  function initEquipmentModals() {
    if (!elements.openModalButtons.length || !elements.modals.length) return;

    function resetFormsIn(modal) {
      const forms = modal.querySelectorAll('form');
      forms.forEach((form) => form.reset());
    }

    const activeModals = new Set();

    const closeAllModals = () => {
      elements.modals.forEach((modal) => {
        modal.classList.remove('active');
        resetFormsIn(modal);
      });
      activeModals.clear();
      scrollUtils.enable();
    };

    elements.openModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal-id');
        const targetModal = document.querySelector(
          `.equipment-modal[data-modal-id="${modalId}"]`
        );
        if (!targetModal) return;

        closeAllModals();
        targetModal.classList.add('active');
        activeModals.add(targetModal);
        scrollUtils.disable();

        const modalSlider = targetModal.querySelector(
          '.equipment-modal__slider'
        );
        if (modalSlider && !modalSlider.swiper) {
          new Swiper(modalSlider, {
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

    elements.modals.forEach((modal) => {
      const closeModalBtn = modal.querySelector('.equipment-modal__close');
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeAllModals);
      }

      modal.addEventListener('click', (e) => {
        const modalContent = modal.querySelector('.equipment-modal__slider');
        if (modalContent && !modalContent.contains(e.target)) {
          closeAllModals();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModals.size > 0) {
        closeAllModals();
      }
    });
  }

  function initContactModals() {
    if (!elements.proposalModal || !elements.collModal) return;

    const activeModals = new Set();

    function resetFormsIn(modal) {
      const forms = modal.querySelectorAll('form');
      forms.forEach((form) => form.reset());
    }

    const openModal = (modal) => {
      resetFormsIn(modal);
      modal.classList.add('active');
      activeModals.add(modal);
      document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
      modal.classList.remove('active');
      activeModals.delete(modal);
      if (activeModals.size === 0) {
        document.body.style.overflow = '';
      }
    };

    const closeAllContactModals = () => {
      [elements.proposalModal, elements.collModal].forEach((modal) => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    };

    elements.proposalBtns.forEach((btn) => {
      btn.addEventListener('click', () => openModal(elements.proposalModal));
    });

    elements.collBtns.forEach((btn) => {
      btn.addEventListener('click', () => openModal(elements.collModal));
    });

    elements.closeButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const modal = this.closest('.contact-modal');
        if (modal) closeModal(modal);
      });
    });

    [elements.proposalModal, elements.collModal].forEach((modal) => {
      modal.addEventListener('click', function (e) {
        if (e.target === this) closeModal(this);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModals.size > 0) {
        closeAllContactModals();
      }
    });
  }

  function init() {
    try {
      initBurgerMenu();
      initSliders();
      initEquipmentModals();
      initContactModals();
      if (typeof AOS !== 'undefined') AOS.init();
    } catch (error) {
      console.error('Ошибка при инициализации:', error);
    }
  }

  init();
});
