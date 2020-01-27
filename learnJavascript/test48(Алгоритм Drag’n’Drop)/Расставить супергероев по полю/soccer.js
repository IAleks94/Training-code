"use strict";
let isMove = eventClick => {
  let target = eventClick.target;
  if (!target.classList.contains("draggable")) {
    return; 
  }
  //фиксируем координаты клика на элементе относительно левого и верхнего ккрая
  let targetSize = target.getBoundingClientRect();
  let shiftX = eventClick.clientX - targetSize.left; //от мышки до левого края элемента
  let shiftY = eventClick.clientY - targetSize.top; //от мышки до верхнего края элемента
  // вствляем элемент в конец body, меняем позицыаниирование и возвращяем на прежнее место под мышку
  document.body.append(target);
  target.style.position = 'absolute';
  

  //функция для сдвигания обьекта
  let moveAt = (pageX, pageY) => {
    target.style.left = pageX - shiftX +'px';
    target.style.top = pageY - shiftY + 'px';
  };
  moveAt(eventClick.pageX, eventClick.pageY); //вставили цель под мышку

  //функция для движения обьекта вместе с мышкой
  let moveTarget = (evtMove) => {
    moveAt(evtMove.pageX, evtMove.pageY);
  };
  //вешаем слушателя на цель при движение мыши 
  target.addEventListener('mousemove', moveTarget);

  //функция прекращения движения
  let stopMove = (evtStop) => {
    evtStop.target.removeEventListener('mousemove', moveTarget);
  };
  //вешаем слушателя на цель при отжатии мыши 
  document.addEventListener("mouseup", stopMove);
};

document.addEventListener("mousedown", isMove);
