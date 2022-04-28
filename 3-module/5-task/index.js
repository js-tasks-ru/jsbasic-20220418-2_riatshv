function getMinMax(str) {
  let result = {};
  let arrNumbers = str.split(" ").filter(item => parseInt(item) || parseInt(item) == 0);
  
  result.min = Math.min(...arrNumbers)
  result.max = Math.max(...arrNumbers)


  return result;
}
