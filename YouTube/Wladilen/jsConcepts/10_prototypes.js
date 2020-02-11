// __proto__
//Object.getPrototypeOf()

function Cat(name, color) {
  this.name = name;
  this.color = color;
}

Cat.prototype.voice = function() {
  console.log(`Cat ${this.name} says myay`);
};

const cat = new Cat("kot", "white");
// console.log(Cat.prototype);
// console.log(cat);
// console.log(cat.__proto__ === Cat.prototype);
// console.log(cat.constructor);
// cat.voice();

// ===============

function Person() {}
Person.prototype.legs = 2;
Person.prototype.skin = "white";

const person = new Person();
person.name = "Andrei";

// console.log('skin' in person); //true
// console.log(person.legs); //2
// console.log(person.name); // Andrei


// console.log(person.hasOwnProperty('name')); //true
// console.log(person.hasOwnProperty('skin')); // false т.к. свойство находиться у прототипа

// Obgect.create()

let proto = {year: 2020}
const myYear = Object.create(proto);

// console.log(myYear.year);                        //2020
// proto.year = 2200;
// console.log(myYear.year);                        //2200

proto = {year:999}
console.log(myYear.year);                           //2020                    

// console.log(myYear.hasOwnProperty('year'));    //false
// console.log(myYear.__proto__===proto);    //true
