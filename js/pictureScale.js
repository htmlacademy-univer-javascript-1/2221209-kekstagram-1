import {imgPreview} from './form.js';
import {Scale} from './data.js';

const scaleContainer = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');

function onScaleClick(evt) {
  const input = Number.parseInt(scaleValue.value, 10);
  let counter = Scale.max;
  const button = evt.target;

  if (button.matches('.scale__control--value')) {
    return;
  }

  if (button.matches('.scale__control--bigger')) {
    counter =  input + Scale.step;
    scaleValue.value = `${counter}%`;
  }

  if (button.matches('.scale__control--smaller')) {
    counter = input - Scale.step;
    scaleValue.value = `${counter}%`;
  }

  if (counter >= Scale.max) {
    counter = Scale.max;
    scaleValue.value = `${counter}%`;
  }

  if (counter <= Scale.min) {
    counter = Scale.min;
    scaleValue.value = `${counter}%`;
  }
  imgPreview.style.transform = `scale(${counter / 10 / 10})`;
}

export {onScaleClick, scaleContainer};
