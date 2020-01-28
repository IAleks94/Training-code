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
  //координаты экрана
  let windowHeight = document.documentElement.clientHeight; //находим высоту "экрана"
  let windowWidth = document.documentElement.clientWidth; //находим ширину "экрана"

  let documentSize = document.documentElement.getBoundingClientRect();

  // вствляем элемент в конец body, меняем позицыаниирование и возвращяем на прежнее место под мышку
  document.body.append(target);
  target.style.position = "absolute";
  target.style.zIndex += 1000;

  //функция для сдвигания обьекта
  let moveAt = (pageX, pageY) => {
    target.style.left = pageX + "px";
    target.style.top = pageY + "px";
  };
  moveAt(eventClick.pageX - shiftX, eventClick.pageY - shiftY); //вставили цель под мышку

  //функция для движения обьекта вместе с мышкой
  let moveTarget = evtMove => {
    let scrolTop = window.pageYOffset; //координаты верхней границы экрана относительно документа
    let bottomWindow = windowHeight + scrolTop; //координаты нижней границы экрана относительно документа
    let scriolLeft = window.pageXOffset; //аналогично слева
    let rightWindow = windowWidth + scriolLeft; //и справа

    let Y = evtMove.pageY;
    let X = evtMove.pageX;
    let newY; // новые координаты запишим сюда
    let newX;
    //условие что бы герои не вылазили за рамки экрана
    if (Y - shiftY < scrolTop) {
      newY = scrolTop;
    } else if (Y - shiftY > bottomWindow) {
      newY = bottomWindow;
    } else {
      newY = Y - shiftY;
    }
    if (X - shiftX < scriolLeft) {
      newX = scriolLeft;
    } else if (X - shiftX > rightWindow) {
      newX = rightWindow;
    } else {
      newX = X - shiftX;
    }
    // тут реализуем прокрутку экрана при нахождении обьекта на границе экрана

    if (Y - shiftY < scrolTop) {
      //если верх обьекта находиться на границе - прокручеваем документ
      window.scrollBy(0, -10);
    } else if (Y - shiftY + targetSize.height > bottomWindow && bottomWindow <= documentSize.height) {
      window.scrollBy(0, 10);
    }
    moveAt(newX, newY);
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
