import {renderPictures} from './pictures.js';
import './validation.js';
import {getData} from './api.js';
import { showAlertMessage } from './util.js';
import {activateFilters} from './pictures-filters.js';
import {loadEffects} from './picture-effects.js';

function onSuccessLoading(data){
  renderPictures(data);
  loadEffects();
  activateFilters(data);
}

getData(onSuccessLoading, showAlertMessage);
