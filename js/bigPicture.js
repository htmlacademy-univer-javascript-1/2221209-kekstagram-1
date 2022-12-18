import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

function addClosingOption() {
  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    closeOption();
    document.removeEventListener('keydown', escButtonClosing);});
  document.addEventListener('keydown', escButtonClosing);
}

function closeOption() {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  bigPicture.querySelector('.social__comments').replaceChildren();
}

function escButtonClosing(evt) {
  if (isEscapeKey(evt)) {
    closeOption();
    document.removeEventListener('keydown', escButtonClosing);
  }
}

function renderBigPicture({url, likes, comments, description}) {
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;
  renderComments(comments);

  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  addClosingOption();
}

function renderComments(comments) {
  comments.forEach((comment) => {
    renderComment(comment);
  });
}

function renderComment({avatar, message, name}) {
  const container = document.createDocumentFragment();
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  container.append(comment);

  const commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = 35;
  commentImg.height = 35;
  container.querySelector('li').append(commentImg);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  container.querySelector('li').append(commentText);

  bigPicture.querySelector('.social__comments').append(container);
}

export {renderBigPicture};
