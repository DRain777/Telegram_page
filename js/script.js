document.addEventListener("DOMContentLoaded", function () {
  // Инициализация Telegram WebApp
  const tg = window.Telegram.WebApp;

  // Получаем элементы DOM
  const elements = {
    buyBtn: document.getElementById("buy"),
    orderBtn: document.getElementById("order"),
    errorDiv: document.getElementById("error"),
    mainDiv: document.getElementById("main"),
    formDiv: document.getElementById("form"),
    nameInput: document.getElementById("user_name"),
    emailInput: document.getElementById("user_email"),
    phoneInput: document.getElementById("user_phone"),
  };

  // Раскрываем WebApp на весь экран
  tg.expand();
  tg.enableClosingConfirmation();

  // Обработчик клика на кнопку "Купить"
  elements.buyBtn.addEventListener("click", () => {
    showForm();
    fillUserData();
  });

  // Обработчик клика на кнопку "Оформить заказ"
  elements.orderBtn.addEventListener("click", submitForm);

  function showForm() {
    elements.mainDiv.style.display = "none";
    elements.formDiv.style.display = "block";
  }

  function fillUserData() {
    if (tg.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      elements.nameInput.value = `${user.first_name || ""} ${
        user.last_name || ""
      }`.trim();
    }
  }

  function validateForm() {
    const name = elements.nameInput.value.trim();
    const email = elements.emailInput.value.trim();
    const phone = elements.phoneInput.value.trim();

    elements.errorDiv.textContent = "";

    if (name.length < 2) {
      elements.errorDiv.textContent = "Имя должно содержать минимум 2 символа";
      return false;
    }

    if (!email.includes("@") || email.length < 5) {
      elements.errorDiv.textContent = "Введите корректный email";
      return false;
    }

    if (phone.length < 5 || !/^[0-9+]+$/.test(phone)) {
      elements.errorDiv.textContent = "Введите корректный номер телефона";
      return false;
    }

    return true;
  }

  function submitForm() {
    if (!validateForm()) return;

    const formData = {
      name: elements.nameInput.value.trim(),
      email: elements.emailInput.value.trim(),
      phone: elements.phoneInput.value.trim(),
      timestamp: new Date().toISOString(),
    };

    tg.sendData(JSON.stringify(formData));
    tg.close();
  }
});
