import {renderPictures} from './pictures.js';
import './validation.js';
import {getData} from './api.js';
import { showAlertMessage } from './util.js';

getData(renderPictures, showAlertMessage);
