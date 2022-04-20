function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  } else {
    let newStr = str.slice(0, maxlength - 1);
    return newStr + "…";
  }
}
