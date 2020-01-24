"use strict";
for (let li of tree.querySelectorAll("li")) {
  let span = document.createElement("span");
  li.prepend(span);
  span.append(span.nextSibling); // поместить текстовый узел внутрь элемента <span>
  // nextSibling выводит следющий элемент для чтения или сам элемент для записи после span (поскольку спан всавлен в 
  // начало, то это текст, который мы помещаем внутрь спана)
}

let hoverText = event => {
  let target = event.target;
  if (event.target.nextSibling === null) { //нет детей
    return;
  }
  target.nextSibling.hidden = !target.nextSibling.hidden;
};

tree.addEventListener("click", hoverText);
