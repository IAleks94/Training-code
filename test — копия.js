var santa = {
  sayHoHoHo: function() { console.log('Ho Ho Ho!') },
  distributeGifts: function() { console.log('Gifts for all!'); },
  goDownTheChimney: function() { console.log('*whoosh*'); }
};

var notSanta = {
  sayHoHoHo: function() { console.log('Oink Oink!') }
  // no distributeGifts() and no goDownTheChimney()
};

// isSantaClausable(santa); // must return TRUE
// isSantaClausable(notSanta); // must return FALSE

console.log('sayHoHoHo' in santa);
console.log('distributeGifts' in santa);
console.log('goDownTheChimney' in santa);

console.log('sayHoHoHo' in notSanta);
console.log('distributeGifts' in notSanta);
console.log('goDownTheChimney' in notSanta);

function isSantaClausable(obg) {
    if ('sayHoHoHo' in obg && 'distributeGifts' in obg && 'goDownTheChimney' in obg) {
      if (typeof obg.sayHoHoHo  === 'function'){
        return true
      }
    }
    return false
  }

isSantaClausable(santa); // must return TRUE
console.log('isSantaClausable(santa): ', isSantaClausable(santa));
isSantaClausable(notSanta); // must return FALSE
console.log('isSantaClausable(notSanta): ', isSantaClausable(notSanta));