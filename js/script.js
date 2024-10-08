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





document.querySelectorAll('.list-wrapp').forEach((wrapper) => {
  const listItems = wrapper.querySelectorAll('li');

  listItems.forEach((item) => {
      item.addEventListener('click', () => {
          const wrapperRect = wrapper.getBoundingClientRect();
          const itemRect = item.getBoundingClientRect();
          
          // Если элемент частично скрыт справа
          if (itemRect.right > wrapperRect.right) {
              const scrollAmount = itemRect.right - wrapperRect.right;
              wrapper.scrollBy({
                  left: scrollAmount,
                  behavior: 'smooth'
              });
          }

          // Если элемент частично скрыт слева (например, после прокрутки вправо)
          if (itemRect.left < wrapperRect.left) {
              const scrollAmount = wrapperRect.left - itemRect.left;
              wrapper.scrollBy({
                  left: -scrollAmount,
                  behavior: 'smooth'
              });
          }
      });
  });
});










document.addEventListener("DOMContentLoaded", function () {

  const favoritBlocks = document.querySelectorAll(".to-favorit, .favorites");

        favoritBlocks.forEach(function (block) {
          block.addEventListener("click", function () {
            block.classList.toggle("active");
          });
        });

  //субменю 3 точки
   // Находим все блоки с классом client-card
   const clientCards = document.querySelectorAll(".client-card, .card");
      
   clientCards.forEach((card) => {
     // Находим блок с классом menu внутри client-card
     const menu = card.querySelector(".menu");
     // Находим блок с классом submenu внутри client-card
     const submenu = card.querySelector(".submenu");
 
     if (menu && submenu) {
       // Добавляем обработчик клика на menu
       menu.addEventListener("click", function (event) {
         event.stopPropagation(); // Останавливаем всплытие события
 
         // Закрываем все открытые submenu в других блоках
         clientCards.forEach((otherCard) => {
           if (otherCard !== card) { // Проверяем, что это не тот же блок
             const otherSubmenu = otherCard.querySelector(".submenu");
             if (otherSubmenu) {
               otherSubmenu.classList.remove("active");
             }
           }
         });
 
         // Переключаем класс active у текущего submenu
         submenu.classList.toggle("active");
       });
 
       // Добавляем обработчик клика на весь документ
       document.addEventListener("click", function (event) {
         // Если клик происходит вне текущего submenu, убираем класс active
         if (!submenu.contains(event.target) && !menu.contains(event.target)) {
           submenu.classList.remove("active");
         }
       });
     }
   });


  // Мультиселекты

  window.toggleOptions = function (element) {
    const container = element.closest(".custom-select-container");
    const options = container.querySelector(".custom-options");
    const placeholder = container.querySelector(".select-placeholder");
    const searchInput = container.querySelector(".search-input");

    const isOpen = options.classList.toggle("open");
    container.classList.toggle("active", isOpen);

    if (isOpen) {
        if (placeholder) {
            placeholder.classList.add("active");
        }
        if (searchInput) {
            searchInput.classList.add("active");
            setTimeout(() => {
                searchInput.focus(); // Устанавливаем фокус на поле поиска после его отображения
            }, 0);
        }
    } else {
        if (placeholder) {
            placeholder.classList.remove("active");
        }
        if (searchInput) {
            searchInput.classList.remove("active");
            searchInput.value = ""; // Очищаем поле поиска
            resetOptions(container); // Сбрасываем отображение всех опций
        }
    }
};

// Функция для переключения состояния чекбоксов
function toggleCheckbox(option) {
    const checkbox = option.querySelector("input[type='checkbox']");
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
    }
}

// Функция для фильтрации опций по введенному тексту
window.filterOptions = function (inputElement) {
    const input = inputElement.value.toLowerCase();
    const container = inputElement.closest(".custom-select-container");
    const options = container.querySelectorAll(".custom-option");
    const headings = container.querySelectorAll("h4");
    let hasMatch = false;

    options.forEach((option) => {
        const label = option.querySelector("label").textContent.toLowerCase();
        if (label.includes(input)) {
            option.style.display = "flex";
            hasMatch = true;
        } else {
            option.style.display = "none";
        }
    });

    headings.forEach((heading) => {
        let nextElement = heading.nextElementSibling;
        let allHidden = true;

        while (nextElement && nextElement.classList.contains("custom-option")) {
            if (nextElement.style.display !== "none") {
                allHidden = false;
                break;
            }
            nextElement = nextElement.nextElementSibling;
        }

        heading.style.display = allHidden ? "none" : "block";
    });

    container.querySelector(".no-results").style.display = hasMatch
        ? "none"
        : "block";
};

// Функция для сброса отображения всех опций
function resetOptions(container) {
    const options = container.querySelectorAll(".custom-option");
    const headings = container.querySelectorAll("h4");
    options.forEach((option) => {
        option.style.display = "flex"; // Показать все опции
    });
    headings.forEach((heading) => {
        heading.style.display = "block"; // Показать все заголовки
    });
    container.querySelector(".no-results").style.display = "none"; // Скрыть сообщение об отсутствии результатов
}

// Функция для удаления выбранного элемента
window.removeItem = function (element) {
    const value = element.previousElementSibling.getAttribute("data-value");
    const container = element.closest(".custom-select-container");
    const checkbox = container.querySelector(
        `.custom-option input[data-value="${value}"]`
    );
    if (checkbox) {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("change"));
    }
    element.parentElement.remove();
    checkIfAnySelected(container); // Проверка наличия выбранных элементов
};

// Закрытие всех открытых списков при клике вне их области
document.addEventListener("click", function (event) {
    document.querySelectorAll(".custom-options.open").forEach((options) => {
        if (!options.parentElement.contains(event.target)) {
            options.classList.remove("open");
            const container = options.closest(".custom-select-container");
            container.classList.remove("active");
            const placeholder = container.querySelector(".select-placeholder");
            const searchInput = container.querySelector(".search-input");
            if (placeholder) placeholder.classList.remove("active");
            if (searchInput) {
                searchInput.classList.remove("active");
                searchInput.value = ""; // Очищаем поле поиска при закрытии списка
                resetOptions(container); // Сбрасываем отображение всех опций
            }
        }
    });
});

// Обработчики событий для всех custom-option и checkbox
document.querySelectorAll(".custom-option").forEach((option) => {
    option.addEventListener("click", function (event) {
        // Проверка, чтобы избежать двойной обработки клика
        if (
            !event.target.classList.contains("remove-item") &&
            event.target.tagName !== "INPUT"
        ) {
            toggleCheckbox(option);
        }
    });
});

document.querySelectorAll(".custom-option input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const container = checkbox.closest(".custom-select-container");
        const selectedItems = container.querySelector(".selected-items");
        const value = checkbox.dataset.value;

        if (checkbox.checked) {
            if (
                !selectedItems.querySelector(
                    `.selected-item span[data-value="${value}"]`
                )
            ) {
                const item = document.createElement("div");
                item.classList.add("selected-item");
                item.innerHTML = `<span data-value="${value}">${value}</span><span class="remove-item" onclick="removeItem(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3034 3.69867C12.5963 3.99157 12.5963 4.46644 12.3034 4.75933L9.06236 8.00033L12.3033 11.2412C12.5962 11.5341 12.5962 12.009 12.3033 12.3019C12.0104 12.5948 11.5355 12.5948 11.2426 12.3019L8.0017 9.06099L4.76089 12.3018C4.46799 12.5947 3.99312 12.5947 3.70023 12.3018C3.40733 12.0089 3.40733 11.534 3.70023 11.2411L6.94104 8.00033L3.70014 4.75943C3.40725 4.46653 3.40725 3.99166 3.70014 3.69877C3.99303 3.40587 4.46791 3.40587 4.7608 3.69877L8.0017 6.93967L11.2427 3.69867C11.5356 3.40578 12.0105 3.40578 12.3034 3.69867Z" fill="#7786A5"/>
    </svg></span>`;
                selectedItems.appendChild(item);
            }
        } else {
            const item = selectedItems.querySelector(
                `.selected-item span[data-value="${value}"]`
            );
            if (item) item.parentElement.remove();
        }

        checkIfAnySelected(container); // Проверка наличия выбранных элементов
    });
});

// Функция для проверки наличия выбранных элементов и добавления класса active
function checkIfAnySelected(container) {
    const selectedItems = container.querySelector(".selected-items");
    if (selectedItems.children.length > 0) {
        selectedItems.classList.add("active");
    } else {
        selectedItems.classList.remove("active");
    }
}



// Моноселекты

const selectContainers = document.querySelectorAll(".select-container-single");

selectContainers.forEach((container) => {
    const selected = container.querySelector(".select-selected");
    const optionsContainer = container.querySelector(".select-items");
    const hiddenSelect = container.querySelector(".hidden-select");

    // Проверяем наличие всех необходимых элементов перед добавлением событий
    if (selected && optionsContainer && hiddenSelect) {
        selected.addEventListener("click", (event) => {
            event.stopPropagation();
            closeAllSelects(selected);
            selected.classList.toggle("active");
            const isSelectHideRemoved = optionsContainer.classList.toggle("select-hide");
            if (!isSelectHideRemoved) {
                container.classList.add("open");
            } else {
                container.classList.remove("open");
            }
        });

        optionsContainer.querySelectorAll("div").forEach((option) => {
            option.addEventListener("click", function () {
                const value = this.getAttribute("data-value");
                selected.innerHTML = this.innerHTML;
                hiddenSelect.value = value;
                optionsContainer.classList.add("select-hide");
                selected.classList.remove("active");

                // Убираем класс open при выборе пункта
                container.classList.remove("open");

                // Добавляем класс active к контейнеру select-container-single при выборе пункта
                container.classList.add("active");
            });
        });
    }
});

document.addEventListener("click", () => {
    closeAllSelects();
});

function closeAllSelects(except) {
    selectContainers.forEach((container) => {
        const selected = container.querySelector(".select-selected");
        const optionsContainer = container.querySelector(".select-items");

        if (selected && optionsContainer && selected !== except) {
            selected.classList.remove("active");
            optionsContainer.classList.add("select-hide");
            container.classList.remove("open");
        }
    });
}


  // var tooltips = document.querySelectorAll(".tooltip");

  // tooltips.forEach(function (tooltip) {
  //   var text = tooltip.getAttribute("data-tooltip");
  //   var tooltipText = document.createElement("div");
  //   tooltipText.className = "tooltip-text";
  //   tooltipText.innerText = text;
  //   tooltip.appendChild(tooltipText);
  // });

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
  // Находим все элементы с классом .butt-more
  const buttons33 = document.querySelectorAll(".butt-more");

  buttons33.forEach((button) => {
    button.addEventListener("click", () => {
      // Находим родительский элемент с классом .wrapper
      const parentWrapper = button.closest(".wrapper");

      if (parentWrapper) {
        // Находим элементы внутри текущего .wrapper
        const textBlock = parentWrapper.querySelector(".text");

        // Переключаем класс open у блока .text
        if (textBlock) {
          textBlock.classList.toggle("open");
        }

        // Переключаем класс hide у кнопки .butt-more
        button.classList.toggle("hide");
      }
    });
  });

  // Меню Вкладок
  // const pageHead = document.querySelector(".page-head ul");
  // if (pageHead) {
  //   const listItems = pageHead.querySelectorAll("li");
  //   const pageContents = document.querySelectorAll("[class^='page-content-']");

  //   listItems.forEach((item, index) => {
  //     item.addEventListener("click", function () {
  //       listItems.forEach((li) => li.classList.remove("active"));
  //       item.classList.add("active");

  //       pageContents.forEach((content) => content.classList.remove("active"));
  //       const targetContent = document.querySelector(".page-content-" + (index + 1));
  //       if (targetContent) {
  //         targetContent.classList.add("active");
  //       }
  //     });
  //   });
  // }


   // Работа с меню вкладок
   const pageHead = document.querySelector(".page-head ul");
   const listItems = pageHead ? pageHead.querySelectorAll("li") : [];
   const pageContents = document.querySelectorAll("[class^='page-content-']");
 
   if (pageHead) {
     listItems.forEach((item, index) => {
       item.addEventListener("click", function () {
         // Удаляем активные классы у всех пунктов списка и контента
         listItems.forEach((li) => li.classList.remove("active"));
         pageContents.forEach((content) => content.classList.remove("active"));
 
         // Добавляем активные классы текущему пункту и соответствующему контенту
         item.classList.add("active");
         const targetContent = document.querySelector(".page-content-" + (index + 1));
         if (targetContent) {
           targetContent.classList.add("active");
         }
       });
     });
   }
 
   // Дополнительное действие по клику на .kostil01
   const kostilBlock1 = document.querySelector(".kostil01");
   if (kostilBlock1) {
     kostilBlock1.addEventListener("click", function (event) {
       event.preventDefault();
       event.stopPropagation();
 
       // Убираем класс active у .page-content-3 и добавляем его к .page-content-2
       const pageContent3 = document.querySelector(".page-content-3");
       if (pageContent3) {
         pageContent3.classList.remove("active");
       }
 
       const pageContent2 = document.querySelector(".page-content-2");
       if (pageContent2) {
         pageContent2.classList.add("active");
       }
 
       // Убираем класс active у третьего пункта списка и добавляем его второму пункту
       const thirdItem = pageHead.querySelector("li:nth-child(3)");
       if (thirdItem) {
         thirdItem.classList.remove("active");
       }
 
       const secondItem = pageHead.querySelector("li:nth-child(2)");
       if (secondItem) {
         secondItem.classList.add("active");
       }
     });
   }
 
   // Дополнительное действие по клику на .kostil02
   const kostilBlock2 = document.querySelector(".kostil02");
   if (kostilBlock2) {
     kostilBlock2.addEventListener("click", function (event) {
       event.preventDefault();
       event.stopPropagation();
 
       // Убираем класс active у всех page-content и добавляем его к .page-content-5
       pageContents.forEach((content) => content.classList.remove("active"));
       const pageContent5 = document.querySelector(".page-content-5");
       if (pageContent5) {
         pageContent5.classList.add("active");
       } else {
         console.error("Не найден .page-content-5");
       }
 
       // Убираем класс active у всех пунктов списка и добавляем его пятому пункту
       listItems.forEach((li) => li.classList.remove("active"));
       const fifthItem = pageHead.querySelector("li:nth-child(5)");
       if (fifthItem) {
         fifthItem.classList.add("active");
       } else {
         console.error("Не найден пятый пункт списка");
       }
     });
   } else {
     console.error("Не найден .kostil02");
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

