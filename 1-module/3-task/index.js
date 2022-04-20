function ucFirst(str) {
  if (str) {
    let firstLetterUp = str[0].toUpperCase();
  	let restLetters = str.slice(1, str.length);
  	let newStr = firstLetterUp + restLetters;
  
  	return newStr;
  } else {
    return str;
  } 
}

