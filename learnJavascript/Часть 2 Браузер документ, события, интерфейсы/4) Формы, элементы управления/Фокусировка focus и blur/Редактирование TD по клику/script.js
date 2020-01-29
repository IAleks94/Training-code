let table = document.getElementById("bagua-table");

/* ваш код */

function editСell(event) {
  let target = event.target.closest("td");
  let area = document.querySelector(".area");
  if (!target || area) return;
  let html = target.innerHTML; // сохранаяем нутро таблицы
  let textarea = document.createElement("textarea");
  textarea.classList.add("area");
  textarea.value = target.innerHTML.replace(/\r?\n/g, ""); //Выводим данные из ячейки
  target.innerHTML = "";
  target.style.padding = 0;
  textarea.rows = 6;
  textarea.wrap = "hard";
  target.append(textarea);
  textarea.focus();

  //функция для создания кнопок
  function createButton(text, num) {
    let button = document.createElement("button");
    button.textContent = text.toUpperCase();
    button.classList.add("button");
    button.classList.add(`button-${text}`);
    button.classList.add(`button-${num}`);
    // найдем координаты textarea
    let textareaSize = textarea.getBoundingClientRect();
    button.style.top = textareaSize.bottom + "px";
    if (num === 1) {
      button.style.left = textareaSize.left + "px";
    } else {
      let earlyButton = document.querySelector(`.button-${num - 1}`).getBoundingClientRect();
      button.style.left = earlyButton.right + "px";
    }
    document.body.append(button);
    return button;
  }

  function saveHtml() {
    target.innerHTML = textarea.value;
    delit();
  }

  function clouseArea() {
    target.innerHTML = html;
    delit();
  }
  function delit() {
    target.style.padding = "";
    textarea.remove();
    document.querySelector("button").remove();
    document.querySelector("button").remove();
  }

  createButton("ок", 1).addEventListener("click", saveHtml);
  createButton("cancel", 2).addEventListener("click", clouseArea);
}

table.addEventListener("click", editСell);
