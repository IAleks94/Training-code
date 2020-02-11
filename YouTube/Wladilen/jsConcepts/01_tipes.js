// null, undefined, boolean, number, string, object, symbol

// console.log('typeof 0: ', typeof 0);
// console.log('typeof true: ', typeof true);
// console.log('typeof "Javascript":', typeof 'Javascript'); "", '', ` `;
// console.log('typeof undefined: ', typeof undefined);
// console.log('typeof Math: ', typeof Math);
// console.log('typeof Symbol("JS"): ', typeof Symbol('JS'));
// console.log('typeof null: ', typeof null + ' but is type null');  //is type null
// console.log('typeof function name(params) {}: ', typeof function name(params) {}); //is type object
// console.log('typeof NaN: ', typeof NaN);

// Привидение типов

// let language = "JavaScript";

// if (language) {
//   console.log("The best lebguage is: ", language);
// }


 // '', 0 , null, undefined, NaN, false = false
// console.log(Boolean(''));      //false
// console.log(Boolean('Hello')); //true
// console.log(Boolean(' '));     //true
// console.log(Boolean('0'));     //true
// console.log(Boolean(0));        //false
// console.log(Boolean(null));     //false
// console.log(Boolean([]));       //true
// console.log(Boolean({}));       //true
// console.log(Boolean(function(){})); //true


// Строки и числа

// console.log( 1 + '2'); // string 12
// console.log('' + 1 + 0); // string 10
// console.log("" - 1 + 0 ); // number -1
// console.log('3' * '8'); // number 24
// console.log(4 + 10 + 'px'); // srting 14 px
// console.log('px' + 4 + 10  ); // srting px510
// console.log('42' - 40); // number 2
// console.log('42px' - 2); //NaN
// console.log(null + 2 ); //number 2
// console.log( undefined + 42); // NaN

// == vs ===

// console.log(2 == '2'); // true
// console.log(2 === '2'); // false
// console.log( undefined == null); // true
// console.log( undefined === null); // false

// console.log('0' == false); //true
// console.log('0' == 0); //true
// console.log(0 === 0); //true

// =====

console.log(false == ''); //true
console.log(false == []); //true
console.log(false == {}); //false

console.log('' == 0); //true
console.log('' == []); //true
console.log('' == {}); //false

console.log(0 == []); //true
console.log(0 == {}); //false
console.log(0 == null); //false


