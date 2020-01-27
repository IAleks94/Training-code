"use strict";

class HoverIntent {
  constructor({
    sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
    interval = 100, // измеряем скорость каждые 100ms
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // убедитесь, что "this" сохраняет своё значение для обработчиков.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // и в функции, измеряющей время (вызываемой из setInterval)
    this.trackSpeed = this.trackSpeed.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);
  }

  // продолжите с этого места

  onMouseOver(event) {
    if (this.isOverElement) {
      // Игнорируем событие над элементом,
      // так как мы уже измеряем скорость
      return;
    }
    this.isOverElement = true;

    //записываем координаты и время наведения на обьект
    this.x = event.clientX;
    this.y = event.clientY;
    this.startTime = Date.now();
    //добовляем слушателя на движение мыши
    elem.addEventListener("mousemove", this.onMouseMove);
    // переодически проверяем скорость
    this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
  }

  onMouseOut(event) {
    //когда ушли с элемента
    if (event.relatedTarget || elem.contains(event.relatedTarget)) {
      this.isOverElement = false;
      this.elem.removeEventListener("mousemove", this.onMouseMove);
      clearInterval(this.checkSpeedInterval);
      if (this.isHover) {
        // если была остановка движения на элементе
        this.out.call(this.elem, event);
        this.isHover = false;
      }
    }
  }

  onMouseMove(event) {
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.lastTime = Date.now();
  }

  trackSpeed() {
    let speed;
    if (!this.lastTime || this.lastTime == this.startTime) {
      speed = 0;
    } else {
      speed = Math.sqrt((this.x - this.lastX) ** 2 +
       (this.y - this.lastY) ** 2) / (this.lastTime - this.startTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.checkSpeedInterval);
      this.isHover = true;
      this.over.call(this.elem, elem);
    } else {
      this.x = this.lastX;
      this.Y = this.lastY;
      this.startTime = this.lastTime;
    }
  }

  destroy() {
    /* ваш код для отключения функционала и снятия всех обработчиков */
    elem.removeEventListener("mousemove", this.onMouseMove);
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
  }
}