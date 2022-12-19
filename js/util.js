import { closeUploadPopup } from './form.js';

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

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function showAlertMessage(isError, isGet) {
  const templateName = isError ? 'error' : 'success';
  const template = document.querySelector(`#${templateName}`).content.querySelector('section');
  const popup = template.cloneNode(true);
  popup.style.zIndex = 3;
  document.body.append(popup);
  const button = popup.querySelector('button');
  button.addEventListener('click', onClickClose);
  document.addEventListener('click', onClickClose);
  document.addEventListener('keydown', onButtonClose);

  function closeAlertMessage() {
    if (!isError) {
      closeUploadPopup();
      popup.remove();
    }
    popup.remove();
    document.querySelector('.img-upload__submit').removeAttribute('disabled');
    document.removeEventListener('keydown', onButtonClose);
    button.removeEventListener('click', onClickClose);
    document.removeEventListener('click', onClickClose);
  }

  function onClickClose(){
    closeAlertMessage();
  }

  function onButtonClose(evt){
    if(isEscapeKey(evt)) {
      closeAlertMessage();
    }
  }

  if (isGet && isError){
    popup.querySelector('.error__title').textContent = 'Ошибка загрузки файлов';
    popup.querySelector('.error__button').textContent = 'Извините за неудобство';
  }
}

function getRandomArrayElements(array, quantity) {
  const copyArray = array.slice();
  const newArray = [];
  for (let i = 0; i < quantity; i++) {
    const randomIndex = getRandomNumber(0, copyArray.length - 1);
    newArray.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  return newArray;
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomNumber, checkStringLength, getRandomArrayElements,
  isEscapeKey, showAlertMessage, throttle, debounce};
