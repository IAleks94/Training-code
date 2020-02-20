let regexp = /#[a-z0-9]{6}\b/ig

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

console.log( str.match(regexp) )  // #121212,#AA00ef