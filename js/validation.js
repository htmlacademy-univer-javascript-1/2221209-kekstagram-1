import {checkStringLength} from './util.js';

const maxSymbols = 20;
const maxHashtags = 5;
const maxCommentLength = 140;

const formUpload = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
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
      check: inputArray.some((item) => item.length > maxSymbols),
      error: `Максимальная длина одного хэш-тега ${maxSymbols} символ, включая решётку`
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputArray.length > maxHashtags,
      error: `Нельзя указать больше ${maxHashtags} хэш-тегов`
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
};

function onHashtagInput() {
  if (pristine.validate()) {
    document.querySelector('.img-upload__submit').classList.remove('disabled');
  } else {
    document.querySelector('.img-upload__submit').classList.add('disabled');
  }
};

function commentHandler(value) {
  errorMessage = '';
  const text = value.trim();
  if (!text) {
    return true;
  }

  const rule = {
    check: checkStringLength(text, maxCommentLength),
    error: 'Слишком длинный комментарий'
  };

  const isValid = rule.check;
  if (!isValid) {
    errorMessage = rule.error;
  }
  return isValid;
};

function helper() {
  document.querySelector('.img-upload__submit').disabled = !pristine.validate();
};

function validation() {
  pristine.addValidator(inputComment, commentHandler, error);
  helper();
}

inputHashtag.addEventListener('input', onHashtagInput);
pristine.addValidator(inputHashtag, hashtagsHandler, error);


formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {validation, helper};