// Let
// let a = "Veriable a";
// let b = "Veriable b";

// {
//   a = "New Veriable A";
//   let b = "Local Variable B";
//   console.log("Scope A: ", a);
//   console.log("Scope B: ", b);
//   // console.log("Scope C: ", c);
//   // let c = 'Something' //Error
// }
// console.log(" A: ", a);
// console.log(" B: ", b);

// Const
// const PORT = 8080;
// // PORT = 2000 //Error
// const array = ["JavaScript", "is", "Awesome"];
// array.push("!"); //  [ 'JavaScript', 'is', 'Awesome', '!' ]
// array[0] = "JS"; // [ 'JS', 'is', 'Awesome', '!' ]
//   //array = ''; //Eror
// console.log("array: ", array);

const obg = {}
obg.name = 'Andrey';
obg.age = 25;

console.log('obg: ', obg);

obg.age = 21;
delete obg.name;

console.log('obg: ', obg);

