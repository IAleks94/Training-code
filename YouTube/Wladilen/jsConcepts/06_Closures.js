function sayHelloTo(name) {
  const message = "Hello " + name;
  return function() {
    console.log(message);
  };
}

// const helloToElena = sayHelloTo("Elena");
// const helloToIgor = sayHelloTo("Igor");
// console.log("helloToElena: ", helloToElena);
//  helloToElena();
//  helloToIgor();

// function createFrameworkManager() {
//   const fw = ["Angular", "React"];

//   return {
//     print: function() {
//       console.log(fw.join(' '));
//     },
//     add: function(framework) {
//       fw.push(framework);
//     }
//   };
// }

// const manager = createFrameworkManager();
// console.log('manager: ', manager);
// //console.log(fw); //Eror;
// manager.print();
// manager.add('VueJS');

// manager.print();

// setTimout

const fib = [1, 2, 3, 5, 8, 13];

// for (var i = 0; i < fib.length; i++) { //Цыкл доходит до i=6 и останавливаеться
//   setTimeout(() => {                   // В масиве нет индекса 6
//     console.log(`fib[${i}] = ${fib[i]}`); // получаем undefined
//   }, 1500);
// }

// так все работает
// for (let i = 0; i < fib.length; i++) {
//     setTimeout(() => {
//       console.log(`fib[${i}] = ${fib[i]}`);
//     }, 1500);
//   }
//работает через замыкание 
for (var i = 0; i < fib.length; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(`fib[${j}] = ${fib[j]}`);
    }, 1500);
  })(i);
}
