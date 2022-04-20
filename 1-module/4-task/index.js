function checkSpam(str) {
  let spamWords = ["1xbet", "xxx"];
  let strLowerCase = str.toLowerCase();
	
  let isInclude = false;
  let i = 0;
  
	while (!isInclude && i < spamWords.length) {
    if (strLowerCase.includes(spamWords[i])) {
      isInclude = true;
    }
    i++;
  }
  
  return isInclude;
}
