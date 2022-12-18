import {isEscapeKey} from './util.js';
import {validation, helper} from './validation.js';
import {onFilterButtonChange, effectList, sliderContainer} from './pictureEffects.js';
import {onScaleClick, scaleContainer} from './pictureScale.js';

const body = document.querySelector('body');
const uploader = document.querySelector('.img-upload__overlay');
const closeButtonUploader = document.querySelector('.img-upload__cancel');
const uploadField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

function closeUploadPopup() {
  uploader.classList.add('hidden');
  body.classList.remove('modal-open');
  scaleContainer.removeEventListener('click', onScaleClick);
  effectList.removeEventListener('change', onFilterButtonChange);
  document.removeEventListener('keydown', possibleEscButtonAction);
  closeButtonUploader.removeEventListener('click', clickClose);
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
  formUpload.reset();
}

function possibleEscButtonAction(evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
    document.removeEventListener('keydown', possibleEscButtonAction);
  }
}

function addListenerForField(field) {
  field.addEventListener('focus', () => {
    document.removeEventListener('keydown', possibleEscButtonAction);
  });
  field.addEventListener('blue', () => {
    document.addEventListener('keydown', possibleEscButtonAction);
  });
}

function clickClose() {
  closeUploadPopup();
  document.removeEventListener('keydown', possibleEscButtonAction);
}

const onHashtagInput = () => helper();
const onCommentInput = () => helper();

function imgUploaderFormOpen() {
  uploader.classList.remove('hidden');
  uploader.querySelector('.scale__control--value').value = '100%'
  body.classList.add('modal-open');
  sliderContainer.classList.add('hidden');
  scaleContainer.addEventListener('click', onScaleClick);
  effectList.addEventListener('change', onFilterButtonChange);
  closeButtonUploader.addEventListener('click', clickClose);
  document.addEventListener('keydown', possibleEscButtonAction);
  addListenerForField(hashtagField);
  addListenerForField(commentField);
  helper();
}

function renderUploadForm() {
  uploadField.addEventListener('change', imgUploaderFormOpen);
  hashtagField.addEventListener('input', onHashtagInput);
  commentField.addEventListener('input', onCommentInput);
  validation();
}

export {renderUploadForm, imgPreview};
