import {imgPreview} from './form.js';
import { scaleValue } from './picture-scale.js';

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const Effects = {
  'chrome': {name: 'chrome', filter: 'grayscale', unit: '',
    options: { range: {min: 0, max: 1}, step: 0.1, start: 1},
  },
  'sepia': { name: 'sepia', filter: 'sepia', unit: '',
    options: { range: {min: 0, max: 1}, step: 0.1, start: 1},
  },
  'marvin': { name: 'marvin', filter: 'invert', unit: '%',
    options: {range: {min: 0, max: 100}, step: 1, start: 100},
  },
  'phobos': {name: 'phobos', filter: 'blur', unit: 'px',
    options: {range: {min: 0, max: 3}, step: 0.1, start: 3},
  },
  'heat': {name: 'heat', filter: 'brightness', unit: '',
    options: {range: {min: 1, max: 3}, step: 0.1, start: 3},
  }
};

function loadEffects() {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
}

function onFilterButtonChange(evt) {
  const evtHandler = evt.target.value;
  if (evtHandler === 'none') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = 'none';
  }

  else {
    sliderContainer.classList.remove('hidden');
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evtHandler}`);
    scaleValue.value = '100%';
    slider.noUiSlider.updateOptions(Effects[evtHandler].options);
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      imgPreview.setAttribute('style', `filter: ${Effects[evtHandler].filter}(${effectValue.value}${Effects[evtHandler].unit}); transform: scale(${Number(scaleValue.value.slice(0, -1)) / 100})`);
    });
  }
}

export { onFilterButtonChange, loadEffects, effectList, sliderContainer };
