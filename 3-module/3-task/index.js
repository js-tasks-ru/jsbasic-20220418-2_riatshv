function camelize(str) {
  return str.split("-").map((item, ndx) => {
    
    if (ndx == 0) return item;
    return item[0].toUpperCase() + item.slice(1, item.length)
    
  }).join("")
}
