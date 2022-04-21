/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
 function isValid(name) {
   if (name) {
    let isFourSymbols = (name.length >= 4);
    let isWhiteSpace = (name.split(" ").length != 1);
    
    if (isFourSymbols && !isWhiteSpace) {
      return true;
    } else {
      return false;
    }

   } else {
     return false;
   }	
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    alert(`Welcome back, ${userName}!`);
  } else {
    alert('Некорректное имя');
  }
}


