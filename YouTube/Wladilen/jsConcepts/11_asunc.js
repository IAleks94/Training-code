const first = () => console.log("First");
const second = () => console.log("Second");
const third = () => console.log("Third");

// first();
// second();
// third();
// First Second Third

first(); 

setTimeout(second, 0);

third();
//First Third Second

