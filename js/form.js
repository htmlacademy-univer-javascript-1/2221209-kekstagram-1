import {isEscapeKey} from './util.js';
import {validation, helper} from './validation.js';

const body = document.querySelector('body');
const uploader = document.querySelector('.img-upload__overlay');
const closeButtonUploader = document.querySelector('.img-upload__cancel');
const uploadField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');


function closeUploadPopup() {
  uploader.classList.add('hidden');
  body.classList.remove('modal-open');
  formUpload.reset();
};

function possibleEscButtonAction(evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
    document.removeEventListener('keydown', possibleEscButtonAction);
  }
};

function addListenerForField(field) {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', possibleEscButtonAction);
  });
  field.addEventListener('blue', () => {
    document.addEventListener('keydown', possibleEscButtonAction);
  });
};

function clickClose() {
  closeUploadPopup();
  document.removeEventListener('keydown', possibleEscButtonAction);
};

const onHashtagInput = () => helper();
const onCommentInput = () => helper();

function imgUploaderFormOpen() {
  uploader.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButtonUploader.addEventListener('click', clickClose);
  document.addEventListener('keydown', possibleEscButtonAction);
  addListenerForField(hashtagField);
  addListenerForField(commentField);
  helper();
};

function renderUploadForm() {
  uploadField.addEventListener('change', imgUploaderFormOpen);
  hashtagField.addEventListener('input', onHashtagInput);
  commentField.addEventListener('input', onCommentInput);
  validation();
};

export {renderUploadForm};
