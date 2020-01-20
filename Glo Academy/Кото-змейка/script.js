"use strict";
let field = document.createElement("div");
field.classList.add("field");
document.body.append(field);
//создаём поле
const createFild = () => {
    let y = 10;
    for (let i = 1; i < 101; i++) {
        let excel = document.createElement("div");
        excel.classList.add("excel");
        let x = i;

        if (i > 10) {
            x = i % 10;
            if (x === 1) {
                y--;
            } else if (x === 0) {
                x = 10;
            }
        }
        excel.setAttribute("posX", x);
        excel.setAttribute("posY", y);
        console.log(i % 10);
        field.append(excel);
    }
};

createFild();

const generateSnake = () => {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
};

let snakeCordinate = generateSnake();

let snakeBody = [
    document.querySelector(
        `[posX = '${snakeCordinate[0]}'][posY = '${snakeCordinate[1]}']`
    ),
    document.querySelector(
        `[posX = '${snakeCordinate[0] - 1}'][posY = '${snakeCordinate[1]}']`
    ),
    document.querySelector(
        `[posX = '${snakeCordinate[0] - 2}'][posY = '${snakeCordinate[1]}']`
    )
];

snakeBody[0].classList.add("head");

for (let i = 1; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakeBody");
}

let mouse;

const createMouse = () => {
    const generateMouse = () => {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    };

    let mouseCoordinate = generateMouse();
    mouse = document.querySelector(`[posX =
        '${mouseCoordinate[0]}'][posY = '${mouseCoordinate[1]}']`);

    while (mouse.classList.contains("snakeBody")) {
        let mouseCoordinate = generateMouse();
        mouse = document.querySelector(`[posX =
        '${mouseCoordinate[0]}'][posY = '${mouseCoordinate[1]}']`);
    }
    mouse.classList.add("mouse");
};

createMouse();

let direction = "right";
let steps = false;
let score = 0;

//Создаём Счетчик сьеденных мышей;
const createCounter = () => {
    let input = document.createElement("input");
    input.style.cssText = `
    margin: auto;
    margin-top: 40px;
    font-size: 30px;
    display: block;
    `;
    input.value = `Ваши очки 0`;
    document.body.append(input);
};
// Изменяем значение счетчика
const valueCounter = value => {
    let counter = document.querySelector("input");
    counter.value = `Ваши очки ${value}`;
};

createCounter(score);

const move = () => {
    let snakeCordinates = [
        snakeBody[0].getAttribute("posX"),
        snakeBody[0].getAttribute("posY")
    ];

    snakeBody[0].classList.remove("head");
    snakeBody[snakeBody.length - 1].classList.remove("snakeBody");
    snakeBody.pop();
    if (direction === "right") {
        if (snakeCordinates[0] < 10) {
            snakeBody.unshift(
                document.querySelector(`[posX =
            '${+snakeCordinates[0] + 1}'][posY = '${snakeCordinates[1]}']`)
            );
        } else {
            snakeBody.unshift(
                document.querySelector(`[posX =
                '1'][posY = '${snakeCordinates[1]}']`)
            );
        }
    } else if (direction === "left") {
        if (snakeCordinates[0] > 1) {
            snakeBody.unshift(
                document.querySelector(`[posX =
            '${+snakeCordinates[0] - 1}'][posY = '${snakeCordinates[1]}']`)
            );
        } else {
            snakeBody.unshift(
                document.querySelector(`[posX =
                '10'][posY = '${snakeCordinates[1]}']`)
            );
        }
    } else if (direction === "up") {
        if (snakeCordinates[1] < 10) {
            snakeBody.unshift(
                document.querySelector(`[posX =
            '${snakeCordinates[0]}'][posY = '${+snakeCordinates[1] + 1}']`)
            );
        } else {
            snakeBody.unshift(
                document.querySelector(`[posX =
                '${snakeCordinates[0]}'][posY = '1']`)
            );
        }
    } else if (direction === "down") {
        if (snakeCordinates[1] > 1) {
            snakeBody.unshift(
                document.querySelector(`[posX =
            '${snakeCordinates[0]}'][posY = '${+snakeCordinates[1] - 1}']`)
            );
        } else {
            snakeBody.unshift(
                document.querySelector(`[posX =
                '${snakeCordinates[0]}'][posY = '10']`)
            );
        }
    }
    //Условия для конца игры
    if (snakeBody[0].classList.contains("snakeBody")) {
        endGame();
    }
    // Сьели мыщь
    if (snakeBody[0].classList.contains("mouse")) {
        eatMouse();
    }

    snakeBody[0].classList.add("head");
    for (let i = 1; i < snakeBody.length; i++) {
        snakeBody[i].classList.add("snakeBody");
    }
    steps = true;
    valueCounter(score);
};

let interval;
let getMowe = () => {
    interval = setInterval(move, 300 - score);
};
//Функция конца игры
const endGame = () => {
    setTimeout(() => alert(`GG. ваши очки ${score}`), 200);
    clearInterval(interval);
    snakeBody[0].style.background = "url(endGame.jpg) center no-repeat";
    snakeBody[0].style.backgroundSize = "cover";
};
//Функция поедания мыши
const eatMouse = () => {
    mouse.classList.remove("mouse");
    let x = snakeBody[snakeBody.length - 1].getAttribute("posX");
    let y = snakeBody[snakeBody.length - 1].getAttribute("posY");
    snakeBody.push(document.querySelector(`[posX ='${x}'][posY = '${y}']`));
    createMouse();
    valueCounter(score++);
};

getMowe();
window.addEventListener("keydown", evt => {
    if (steps) {
        if (
            (evt.code === "ArrowLeft" || evt.code === "KeyA") &&
            direction !== "right"
        ) {
            direction = "left";
            steps = false;
        } else if (
            (evt.code === "ArrowRight" || evt.code === "KeyD") &&
            direction !== "left"
        ) {
            direction = "right";
            steps = false;
        } else if (
            (evt.code === "ArrowUp" || evt.code === "KeyW") &&
            direction !== "down"
        ) {
            direction = "up";
            steps = false;
        } else if (
            (evt.code === "ArrowDown" || evt.code === "KeyS") &&
            direction !== "up"
        ) {
            direction = "down";
            steps = false;
        }
    }
});