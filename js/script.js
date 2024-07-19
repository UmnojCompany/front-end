  
  jQuery(document).ready(function ($) {


});
document.addEventListener("DOMContentLoaded", function () {

  //Вызов Модальных окон
  document.querySelectorAll(".trigger").forEach((item) => {
    item.addEventListener("click", function () {
      const modalType = this.getAttribute("data-modal-type"); // Например, 'formModal' или 'infoModal'

      // Загрузка содержимого модального окна
      fetch("modals.html")
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const modalContent = doc.getElementById(modalType).innerHTML;

          document.getElementById("modal-body").innerHTML = modalContent;
          document.getElementById("modal").style.display = "flex"; // Показываем модальное окно
        });
    });
  });

  // Закрытие модального окна
  document
    .querySelector(".close-button")
    .addEventListener("click", function () {
      document.getElementById("modal").style.display = "none";
    });
  
// Переключатели
  var toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
// Кнопка Открыть еще
  var button = document.querySelector(".butt-more");

  if (button) {
    button.addEventListener("click", function () {
      var textBlock = document.querySelector(".text");

      if (textBlock) {
        textBlock.classList.add("open");
      }

      button.classList.add("hide");
    });
  }
  // Меню Вкладок
  var pageHead = document.querySelector(".page-head ul");
  var listItems = pageHead.querySelectorAll("li");

  listItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      // Удаляем класс active у всех li
      listItems.forEach(function (li) {
        li.classList.remove("active");
      });

      item.classList.add("active");

      var pageContents = document.querySelectorAll(
        "[class^='page-content-']"
      );

      pageContents.forEach(function (content) {
        content.classList.remove("active");
      });

      var targetContent = document.querySelector(
        ".page-content-" + (index + 1)
      );
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
});