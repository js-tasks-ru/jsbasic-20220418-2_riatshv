function isEmpty(obj) {
  for (let key in obj) {
    if (typeof(key) == "string") {
      return false;
    }
  }
  return true;
}
