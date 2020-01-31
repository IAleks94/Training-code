"use strict";
let formContainer = document.querySelector("#prompt-form-container");
let form = document.querySelector("#prompt-form");
formContainer.hidden = true;
// Показать полупрозрачный DIV, чтобы затенить страницу
// (форма располагается не внутри него, а рядом, потому что она не должна быть полупрозрачной)
function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  // убираем возможность прокрутки страницы во время показа модального окна с формой
  document.body.style.overflowY = "hidden";

  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}

function showPrompt(html, callback) {
  showCover();
  form.text.value ='';
  formContainer.hidden = false;
  form.text.focus();
  let promptMessage = document.querySelector("#prompt-message");
  promptMessage.innerHTML = html;

  let firstElement = form.elements[0];
  let lastElement = form.elements[form.elements.length - 1];

  // функция отслеживающая табы и эскейпы
  function onWhom(event) {
    let target = event.target;
   switch (target) {
      case lastElement:
        if (event.key === "Tab" && !event.shiftKey) {
          event.preventDefault();
          firstElement.focus();
          
        }
        break;
      case firstElement:
        if (event.key === "Tab" && event.shiftKey) {
          event.preventDefault();
          lastElement.focus();
        }
        //без этого при выделении поля ввода на эскейп ничего не срабатывает
        if (event.key === "Escape") {
          complete(null);
        }
        break;

      default:
        if (event.key === "Escape") {
          complete(null);
        }
        break;
    }
  }
  function complete(value) {
    hideCover();
    formContainer.hidden = true;
    document.removeEventListener("keydown", onWhom);
    callback(value);
  }

  function submit(event) {
    event.preventDefault();
    let value = form.text.value;
    if (value == "") return; // игнорируем отправку пустой формы

    complete(value);
  }

  function isCancel(event) {
    let target = event.target;
    if (target === form.cancel) {
      complete(null);
    }
  }

  form.addEventListener("submit", submit);
  form.addEventListener("click", isCancel);
  document.addEventListener("keydown", onWhom);
}

document.getElementById("show-button").addEventListener("click", () => {
  showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
    alert("Вы ввели: " + value);
  });
});
