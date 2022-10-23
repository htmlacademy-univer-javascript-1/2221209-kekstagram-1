//Функция, возвращающая случайное целое число из переданного диапазона включительно
//Результат: целое число из диапазона "от min до max"
function getRandomNumber(min, max){
  if (min < 0 || min >= max){
    throw{name : 'Invalid arguments', message : 'Invalid arguments'};
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(3,10);

function checkStringLength(string, maxLength){
  string = String(string);
  return string.length <= maxLength;
}

checkStringLength('asdf', 5);
