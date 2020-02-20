let regexp = /<[^<>]+>/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

console.log( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'