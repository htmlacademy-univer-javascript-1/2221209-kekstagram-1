function getRandomNumber(min, max){
  if (min < 0 || min >= max){
    throw{name : 'Invalid arguments', message : 'Invalid arguments'};
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkStringLength(string, maxLength){
  string = String(string);
  return string.length <= maxLength;
}

export {getRandomNumber, checkStringLength};
