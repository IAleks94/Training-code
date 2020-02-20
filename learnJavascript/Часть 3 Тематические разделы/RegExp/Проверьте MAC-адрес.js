let regexp = /^(([0-9A-F]){2}:){5}([0-9A-F]){2}$/i;
// let regexp = /^(([0-9A-F]){2})(:[0-9A-F]{2}){5}$/i; //из учебника
console.log(regexp.test("01:32:54:67:89:AB")); // true

console.log(regexp.test("0132546789AB")); // false (нет двоеточий)

console.log(regexp.test("01:32:54:67:89")); // false (5 чисел, должно быть 6)

console.log(regexp.test("01:32:54:67:89:ZZ")); // false (ZZ в конце строки)
