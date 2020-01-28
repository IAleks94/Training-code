"use strict";
let isMove = eventClick => {
  let target = eventClick.target;
  if (!target.classList.contains("draggable")) {
    return;
  }
  eventClick.preventDefault();
  //фиксируем координаты клика на элементе относительно левого и верхнего ккрая
  let targetSize = target.getBoundingClientRect();
  let shiftX = eventClick.clientX - targetSize.left; //от мышки до левого края элемента
  let shiftY = eventClick.clientY - targetSize.top; //от мышки до верхнего края элемента
  // вствляем элемент в конец body, меняем позицыаниирование и возвращяем на прежнее место под мышку
  document.body.append(target);
  target.style.position = "absolute";
  target.style.zIndex += 1000;

  //функция для сдвигания обьекта
  let moveAt = (pageX, pageY) => {
    target.style.left = pageX - shiftX + "px";
    target.style.top = pageY - shiftY + "px";
  };
  moveAt(eventClick.pageX, eventClick.pageY); //вставили цель под мышку

  //функция для движения обьекта вместе с мышкой
  let moveTarget = evtMove => {
    // тут реализуем прокрутку экрана при нахождении обьекта на границе экрана
    let windowHeight = document.documentElement.clientHeight; //находим высоту "экрана"
    let scrolTop = window.pageYOffset; //координаты верхней границы экрана относительно документа
    let bottomWindow = windowHeight + scrolTop; //координаты нижней границы экрана относительно документа

    if (evtMove.pageY - shiftY < scrolTop) {
      //если верх обьекта находиться на границе - прокручеваем документ
      window.scrollBy(0, -10);
    } else if (evtMove.pageY - shiftY + targetSize.height > bottomWindow) {
      window.scrollBy(0, 10);
    }
    moveAt(evtMove.pageX, evtMove.pageY);
  };

  //вешаем слушателя на цель при движение мыши
  target.addEventListener("mousemove", moveTarget);

  //функция прекращения движения
  let stopMove = evtStop => {
    evtStop.target.removeEventListener("mousemove", moveTarget);
  };
  //вешаем слушателя на цель при отжатии мыши
  document.addEventListener("mouseup", stopMove);
};

document.addEventListener("mousedown", isMove);
