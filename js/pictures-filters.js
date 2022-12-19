import { deletePictures, renderPictures } from './pictures.js';
import { debounce, getRandomArrayElements } from './util.js';

const filters = document.querySelector('.img-filters');
const buttons = filters.querySelectorAll('button');

function activateFilters(data) {
  filters.classList.remove('img-filters--inactive');
  buttons.forEach((button) => button.addEventListener('click', (evt) => {filterHandler(evt, data);}));
}

function filterHandler(evt, data) {
  activateFiltersButtons(evt);
  debounce(() => {changeFilter(evt.target.id, data);})();
}

function activateFiltersButtons(evt) {
  const activeClass = 'img-filters__button--active';
  filters.querySelector(`.${activeClass}`).classList.remove(activeClass);
  evt.target.classList.add(activeClass);
}

function changeFilter(name, data) {
  deletePictures();
  switch (name) {
    case 'filter-default':
      renderPictures(data);
      break;
    case 'filter-random':
      renderPictures(getRandomArrayElements(data, 10));
      break;
    case 'filter-discussed':
      renderPictures(data.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length));
      break;
    } 
}

export {activateFilters};
