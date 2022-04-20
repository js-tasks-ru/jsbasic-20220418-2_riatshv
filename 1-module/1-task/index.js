function factorial(n) {
  if (parseInt(n) || parseInt(n) == 0) {
    let fact = 1;
    for (let i = 2; i <= n; i++) {
      fact*=i;
    }
    return fact;
  } else {
    return "Вы ввели не числовое значение"
  }
}
