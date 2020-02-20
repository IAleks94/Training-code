// function parse(str) {
//   let regexp = /(?<a>\-?\d+(\.\d)?\b) (?<op>[-+/*]) (?<b>\-?\d+(\.\d)?\b)/
//   return str.match(regexp).groups
//   }
  
//   let {a, op, b} = parse("1.2 * 3.4");
  
//   console.log(a); // 1.2
//   console.log(op); // *
//   console.log(b); // 3.4

//или 

function parse(str) {
  let regexp = /(?<a>\-?\d+(\.\d)?\b) (?<op>[-+/*]) (?<b>\-?\d+(\.\d)?\b)/
  result = str.match(regexp).groups
  return [result.a, result.op, result.b]
  }
  
  let [a, op, b] = parse("1.2 * 3.4");
  
  console.log(a); // 1.2
  console.log(op); // *
  console.log(b); // 3.4