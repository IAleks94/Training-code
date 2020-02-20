function isPrime(num) {
  let arrPrime = [2, 3, 5, 7, 11];
  if (num <= 1) {
    return false;
  }
  if (arrPrime.includes(num)) {
    return true;
  } else if (notPrime()) {
    return false;
  } else {
    for (var i = 5; i <= Math.sqrt(num); i += 6)
    if (num % i === 0 || num % (i + 2) === 0)
      return false;
  }
  function notPrime() {
    for (let prime of arrPrime) {
      if (num % prime === 0) return true;
    }
  }
  return true;
}

console.log(isPrime(73));
