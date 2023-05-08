"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  let count = 0;
  let word2 = word.toUpperCase();
  let guess2 = guess.toUpperCase();
  const usedIndex = [];
  //console.log(guess2.length);
  //console.log(word2,guess2); // for debugging usage
  
  for(let i=0; i<word2.length; i++) {
    for(let j=0; j<guess2.length; j++) {
      if(usedIndex.includes(j)) continue;
      if(guess2[i] === word2[j]) {
        usedIndex.push(j);
        count++;
        break;
      }
    }
  }
  return count;
}
