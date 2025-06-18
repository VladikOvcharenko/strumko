document.addEventListener('DOMContentLoaded', () => {
  const forms = [
    document.getElementById('form'),
    document.getElementById('modal-form-proposal'),
    document.getElementById('modal-form-coll'),
  ];

  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  const prefix = '+380';

  // ======= Телефон: автозаполнение +380 и фильтрация =======
  phoneInputs.forEach((input) => {
    input.setAttribute('maxlength', '13');

    input.addEventListener('focus', () => {
      if (!input.value.startsWith(prefix)) {
        input.value = prefix;
      }
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    });

    input.addEventListener('input', () => {
      if (!input.value.startsWith(prefix)) {
        input.value = prefix;
      }
      let onlyDigits = input.value.replace(/\D/g, '');
      if (onlyDigits.startsWith('380')) {
        onlyDigits = onlyDigits.slice(3);
      }
      onlyDigits = onlyDigits.slice(0, 9);
      input.value = prefix + onlyDigits;
    });

    input.addEventListener('keydown', (e) => {
      const cursorPos = input.selectionStart;
      const allowedKeys = [
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
        'Tab',
      ];

      if (
        (cursorPos <= prefix.length &&
          (e.key === 'Backspace' || e.key === 'Delete')) ||
        (e.key === 'ArrowLeft' && cursorPos === prefix.length)
      ) {
        e.preventDefault();
      }

      if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    });
  });

  // ======= Валидация всех форм =======
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      let isValid = true;

      form.querySelectorAll('.contact-form__label').forEach((label) => {
        label.classList.remove('error');
      });

      const nameInput = form.querySelector('input[name="name"]');
      if (!nameInput || !nameInput.value.trim()) {
        markInvalid(nameInput);
        isValid = false;
      }

      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.offsetParent !== null) {
        const digits = phoneInput.value.replace(/\D/g, '').slice(3);
        if (!digits || digits.length < 9) {
          markInvalid(phoneInput);
          isValid = false;
        }
      }

      const emailInput = form.querySelector(
        'input[type="email"], input[name="email"]'
      );
      if (emailInput && emailInput.offsetParent !== null) {
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          markInvalid(emailInput);
          isValid = false;
        }
      }

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function markInvalid(input) {
    const label = input.closest('.contact-form__label');
    if (label) {
      label.classList.add('error');
    }
  }

  function resetPhonePrefix(form) {
    const tel = form.querySelector('input[type="tel"]');
    if (tel) tel.value = prefix;
  }
});
