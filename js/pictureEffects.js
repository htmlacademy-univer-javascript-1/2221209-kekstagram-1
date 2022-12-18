import {imgPreview} from './form.js';
import {Effects} from './data.js';

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

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
};

function onFilterButtonChange(evt) {
  const evtHandler = evt.target.value;
  if (evtHandler === 'none') {
    sliderContainer.classList.add('hidden');
    console.log('hj')
    imgPreview.style.filter = 'none';
  }

  else {
    sliderContainer.classList.remove('hidden');
    imgPreview.removeAttribute('style')
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(Effects[evtHandler].options);
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      imgPreview.setAttribute('style', `filter: ${Effects[evtHandler].filter}(${effectValue.value}${Effects[evtHandler].unit})`)
    });
  }
};

export { onFilterButtonChange, loadEffects, effectList, sliderContainer };
