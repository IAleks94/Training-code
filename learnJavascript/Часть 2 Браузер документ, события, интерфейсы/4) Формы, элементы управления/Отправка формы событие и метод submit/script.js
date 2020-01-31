"use strict";
let formContainer = document.querySelector("#prompt-form-container");
let form = document.querySelector("#prompt-form");
formContainer.hidden = true;
function showPrompt(html, callback) {
  formContainer.hidden = false;
  let promptMessage = document.querySelector("#prompt-message");
  promptMessage.innerHTML = html;
  formContainer.addEventListener("click", () => {
    event.preventDefault();
  });
  form.addEventListener("focusout", () => {
    if (!event.target.closest("input")) {
      event.target.focus();
    }
  });
}

showPrompt("Введите что-нибудь<br>...умное :)");
