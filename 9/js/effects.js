import {uploadPhotoForm, previewPhoto } from './upload-photo-form.js';

const effectSlider =  uploadPhotoForm.querySelector('.effect-level__slider');
const effectSliderValue = uploadPhotoForm.querySelector('.effect-level__value');

const filters = {
  chrome: {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 0.1
});

effectSlider.noUiSlider.on('update', () => {
  effectSliderValue.value = effectSlider.noUiSlider.get();
  const filterName = previewPhoto.dataset.filterName;

  if (filterName) {
    const effect = filters[filterName].effect;
    const unit = filters[filterName].unit;
    previewPhoto.style.filter = `${effect}(${effectSliderValue.value}${unit})`;
  }
});

const updateSlider = (filterValue, slider) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: filterValue.min,
      max: filterValue.max
    },
    start: filterValue.max,
    step: filterValue.step
  });
};

function onEffectsChange (evt) {
  const selectedFilter = evt.target;
  const filterName = selectedFilter.value;

  if (selectedFilter.matches('input[type="radio"]')) {
    previewPhoto.className = `effects__preview--${filterName}`;
    previewPhoto.dataset.filterName = filterName;

    const filter = filters[filterName];

    if (filter) {
      const effect = filter.effect;
      const effectValue = filter.max;
      const unit = filter.unit;
      previewPhoto.style.filter = `${effect}(${effectValue}${unit})`;

      updateSlider(filter, effectSlider);
      effectSlider.classList.remove('visually-hidden');
    } else {
      previewPhoto.style.filter = '';
      effectSlider.classList.add('visually-hidden');
    }
  }
}

uploadPhotoForm.addEventListener('change', onEffectsChange);
