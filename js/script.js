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

  //var tooltips = document.querySelectorAll(".tooltip");

  tooltips.forEach(function (tooltip) {
    var text = tooltip.getAttribute("data-tooltip");
    var tooltipText = document.createElement("div");
    tooltipText.className = "tooltip-text";
    tooltipText.innerText = text;
    tooltip.appendChild(tooltipText);
  });

  // чек-листы одиночный выбор

  // const listItems2 = document.querySelectorAll('.form .chek-lists-single li');

  // listItems2.forEach(function(item) {
  //   item.addEventListener('click', function() {
  //     // Снять класс active со всех пунктов списка
  //     listItems2.forEach(function(el) {
  //       el.classList.remove('active');
  //     });
  //     // Добавить класс active к выбранному пункту
  //     item.classList.add('active');
  //   });
  // });

  // // чек-листы мультивыбор

  // const listItems = document.querySelectorAll('.form .chek-lists li');

  // listItems.forEach(function(item) {
  //   item.addEventListener('click', function() {
  //     item.classList.toggle('active');
  //   });
  // });

  // //обработка числовых полей
  
  // const numberInputs = document.querySelectorAll('.number-input');

  // numberInputs.forEach(function(input) {
  //   function formatNumber(value) {
  //     return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  //   }

  //   function applyStyles() {
  //     const parent = input.closest('.input-container');
  //     const placeholder = parent.querySelector('.placeholder');

  //     if (input.value) {
  //       input.classList.add('filled');
  //       placeholder.classList.add('filled');
  //     } else {
  //       input.classList.remove('filled');
  //       placeholder.classList.remove('filled');
  //     }
  //   }

  //   input.addEventListener('input', function() {
  //     // Remove all non-digit characters
  //     let value = input.value.replace(/\s+/g, '').replace(/\D/g, '');

  //     // Ensure the value respects the min, max and maxlength constraints
  //     const min = parseInt(input.getAttribute('min'), 10);
  //     const max = parseInt(input.getAttribute('max'), 10);
  //     const maxLength = parseInt(input.getAttribute('maxlength'), 10);

  //     // Limit the length of the input
  //     if (maxLength && value.length > maxLength) {
  //       value = value.slice(0, maxLength);
  //     }

  //     // Only set value if it's within the min and max range and has maxLength digits
  //     if (value && value.length === maxLength) {
  //       const intValue = parseInt(value, 10);
  //       if (intValue < min) {
  //         value = min.toString();
  //       } else if (intValue > max) {
  //         value = max.toString();
  //       }
  //     }

  //     input.value = value;
  //     // Apply styles
  //     applyStyles();
  //   });

  //   // Initial check to add filled class if input is already filled
  //   applyStyles();
  // });
  
  


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

      initializeDynamicElements(); // Инициализация после загрузки модального окна
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
  initializeDynamicElements();
});

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



// дублирование для ajax

function initializeDynamicElements() {
  // чек-листы одиночный выбор
  const listItems2 = document.querySelectorAll('.form .chek-lists-single li');

  listItems2.forEach(function(item) {
    item.addEventListener('click', function() {
      // Снять класс active со всех пунктов списка
      listItems2.forEach(function(el) {
        el.classList.remove('active');
      });
      // Добавить класс active к выбранному пункту
      item.classList.add('active');
    });
  });

  // чек-листы мультивыбор
  const listItems = document.querySelectorAll('.form .chek-lists li');

  listItems.forEach(function(item) {
    item.addEventListener('click', function() {
      item.classList.toggle('active');
    });
  });

  // обработка числовых полей
  const numberInputs = document.querySelectorAll('.number-input');

  numberInputs.forEach(function(input) {
    function formatNumber(value) {
      return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

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
      // Remove all non-digit characters
      let value = input.value.replace(/\s+/g, '').replace(/\D/g, '');

      // Ensure the value respects the min, max and maxlength constraints
      const min = parseInt(input.getAttribute('min'), 10);
      const max = parseInt(input.getAttribute('max'), 10);
      const maxLength = parseInt(input.getAttribute('maxlength'), 10);

      // Limit the length of the input
      if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength);
      }

      // Only set value if it's within the min and max range and has maxLength digits
      if (value && value.length === maxLength) {
        const intValue = parseInt(value, 10);
        if (intValue < min) {
          value = min.toString();
        } else if (intValue > max) {
          value = max.toString();
        }
      }

      input.value = value;
      // Apply styles
      applyStyles();
    });

    // Initial check to add filled class if input is already filled
    applyStyles();
  });
}

