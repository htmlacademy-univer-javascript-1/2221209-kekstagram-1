import {sendData} from './api.js';
import {checkStringLength, showAlertMessage} from './util.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const formUpload = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
let errorMessage = '';

const error = () => errorMessage;

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper'
});

function hashtagsHandler(value) {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символ, включая решётку`
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы или не начинается с #'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
}

function onHashtagInput() {
  if (pristine.validate()) {
    document.querySelector('.img-upload__submit').classList.remove('disabled');
  } else {
    document.querySelector('.img-upload__submit').classList.add('disabled');
  }
}

function commentHandler(value) {
  errorMessage = '';
  const text = value.trim();
  if (!text) {
    return true;
  }

  const rule = {
    check: checkStringLength(text, MAX_COMMENT_LENGTH),
    error: 'Слишком длинный комментарий'
  };

  const isValid = rule.check;
  if (!isValid) {
    errorMessage = rule.error;
  }
  return isValid;
}

function helper() {
  document.querySelector('.img-upload__submit').disabled = !pristine.validate();
}

function validation() {
  pristine.addValidator(inputComment, commentHandler, error);
  helper();
}

function blockSubmitButton() {
  submitButton.disabled = 'true';
};

function unblockSubmitButton() {
  submitButton.disabled = 'false';
};

inputHashtag.addEventListener('input', onHashtagInput);
pristine.addValidator(inputHashtag, hashtagsHandler, error);

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(() => {
      blockSubmitButton();
      setTimeout(showAlertMessage, 2000);
    },
    () => {
      showAlertMessage(true, false);
    },
    new FormData(evt.target), unblockSubmitButton);
  }
});

export {validation, helper};
