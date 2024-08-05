jQuery(document).ready(function ($) {
  // jQuery код здесь
   // Применение маски к элементу с классом phone
   if (typeof Inputmask !== "undefined") {
    Inputmask({
      mask: "+7 (999) 999-99-99",
      placeholder: "_",
      showMaskOnHover: false,
      showMaskOnFocus: true,
    }).mask(".phone");
  } else {
    console.error("Inputmask is not loaded");
  }
});

document.addEventListener("DOMContentLoaded", function () {

  //обработка числовых полей
  
  const numberInputs = document.querySelectorAll('.number-input');

  numberInputs.forEach(function(input) {
    function applyStyles() {
      const parent = input.closest('.input-container');
      const placeholder = parent.querySelector('.placeholder');
      
      if (input.value) {
        input.classList.add('filled');
        placeholder.classList.add('filled');
      } else {
        input.classList.remove('filled');
        placeholder.classList.remove('filled');
      }
    }

    input.addEventListener('input', function() {
      applyStyles();
      
      // Ensure the value respects the min, max and maxlength constraints
      const value = input.value;
      const min = input.getAttribute('min');
      const max = input.getAttribute('max');
      const maxLength = input.getAttribute('maxlength');

      // Ensure the value is within min and max range
      if (min !== null && value < min) {
        input.value = min;
      }
      if (max !== null && value > max) {
        input.value = max;
      }

      // Limit the length of the input
      if (maxLength !== null && value.length > maxLength) {
        input.value = value.slice(0, maxLength);
      }
    });

    // Initial check to add filled class if input is already filled
    applyStyles();
  });
  
  


  // Функция для применения маски к полям телефона
  function applyInputMask() {
    document.querySelectorAll(".phone").forEach(function (input) {
      Inputmask({
        mask: "+7 (999) 999-99-99",
        placeholder: "_",
        showMaskOnHover: false,
        showMaskOnFocus: true
      }).mask(input);
    });
  }

  // Функция для загрузки и отображения модальных окон
  function loadModal(modalType) {
    fetch("modals.html")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const modalContent = doc.getElementById(modalType).innerHTML;

        document.getElementById("modal-body").innerHTML = modalContent;
        document.getElementById("modal").style.display = "flex"; // Показываем модальное окно
        document.body.classList.add("hold"); // Добавляем класс hold для body

        applyInputMask(); // Применяем маску после загрузки модального окна
      })
      .catch((error) => console.error('Error loading modal content:', error));
  }

  // Вызов Модальных окон
  document.querySelectorAll(".trigger").forEach((item) => {
    item.addEventListener("click", function () {
      const modalType = this.getAttribute("data-modal-type"); // Например, 'formModal' или 'infoModal'
      loadModal(modalType);
    });
  });

  // Закрытие модального окна
  const closeButton = document.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      document.getElementById("modal").style.display = "none";
      document.body.classList.remove("hold"); // Убираем класс hold для body
    });
  }

  // Переключатели
  document.querySelectorAll(".toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  // Кнопка Открыть еще
  const button = document.querySelector(".butt-more");
  if (button) {
    button.addEventListener("click", function () {
      const textBlock = document.querySelector(".text");
      if (textBlock) {
        textBlock.classList.add("open");
      }
      button.classList.add("hide");
    });
  }

  // Меню Вкладок
  const pageHead = document.querySelector(".page-head ul");
  if (pageHead) {
    const listItems = pageHead.querySelectorAll("li");
    const pageContents = document.querySelectorAll("[class^='page-content-']");

    listItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        listItems.forEach((li) => li.classList.remove("active"));
        item.classList.add("active");

        pageContents.forEach((content) => content.classList.remove("active"));
        const targetContent = document.querySelector(".page-content-" + (index + 1));
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  }


});

 // Первый скрипт для обработки кликов на элементах с классом form-next
 document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("form-next")) {
    event.target.classList.add("hide");

    var modalContent = event.target.closest(".modal-content");

    var confirmElement = modalContent.querySelector(".confirm");

    if (confirmElement) {
      confirmElement.classList.add("active");
    }
  }
});

// Второй скрипт для ограничения ввода одной цифрой в инпутах с классом single-digit
document.body.addEventListener("input", function (event) {
  if (event.target.classList.contains("single-digit")) {
    if (event.target.value.length > 1) {
      event.target.value = event.target.value.slice(0, 1);
    }
  }
});

