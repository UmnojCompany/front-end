jQuery(document).ready(function ($) {
  // jQuery код здесь
});

document.addEventListener("DOMContentLoaded", function () {
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
