function filterRange(arr, a, b) {
  if (b < a) {
    let c = b;
    b = a;
    a = c;
  }
  
	let filterArr = arr.filter(function(item) {
    return item >= a && item <=b
  })
  return filterArr;
}
