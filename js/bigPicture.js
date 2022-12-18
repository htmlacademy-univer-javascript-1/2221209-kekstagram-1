import {isEscapeKey} from './util.js';

const shownCommentsCount = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const buttonClose = document.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let actualComments = [];
let countRenderedComments = shownCommentsCount;

const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
  </li>`;

const getCounterCommentsTemplate = (shownCommentsCount) => `${Math.min(countRenderedComments, shownCommentsCount)} из <span class="comments-count">${shownCommentsCount}</span> комментариев`;

function openBigPicture(element) {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  renderBigPicture(element);

  buttonClose.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function renderBigPicture({url, likes, comments, description}) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  showComments(comments);
}

function showComments(comments) {
  actualComments = comments.slice();
  commentsList.innerHTML='';

  if (comments.length === 0) {
    commentsLoader.classList.add('hidden');
    commentsCount.innerHTML = 'Нет комментариев';
    return;
  }

  renderComments();
  commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
}

function renderComments() {
  getCounterComments();

  commentsList.innerHTML='';
  const commentsTemplate = actualComments.slice(0, countRenderedComments).map((comment) => getCommentTemplate(comment)).join('');
  commentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (countRenderedComments >= actualComments.length) {
    commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
    commentsLoader.classList.add('hidden');
  }
}

function getCounterComments() {
  commentsCount.innerHTML='';
  commentsCount.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
}

function pictureClose() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  buttonClose.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
  countRenderedComments = shownCommentsCount;
}

function onDocumentEscKeyDown(evt) {
  if(isEscapeKey(evt)) {
    pictureClose();
  }
}

function onCloseButtonClick() {
  pictureClose();
}

function onCommentsLoaderButtonClick() {
  countRenderedComments += shownCommentsCount;
  renderComments();
}

export { openBigPicture };
