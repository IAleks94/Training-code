//let regexp = /#([a-z0-9]{3})+\b/gi;
let regexp = /#([a-z0-9]{3}){1,2}\b/gi;
let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

console.log( str.match(regexp) ); // #3f3 #AA00ef