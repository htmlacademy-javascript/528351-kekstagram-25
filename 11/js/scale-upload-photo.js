import {uploadPhotoForm, previewPhoto } from './upload-photo-form.js';

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleValue = uploadPhotoForm.querySelector('.scale__control--value');
const buttonIncreaseScale = uploadPhotoForm.querySelector('.scale__control--bigger');
const buttonDecreaseScale = uploadPhotoForm.querySelector('.scale__control--smaller');

let numberScaleValue = parseInt(scaleValue.value.match(/\d+/), 10);

const chsngeScale = (number) => {
  previewPhoto.style.transform = `scale(${number/100})`;
};

buttonIncreaseScale.disabled = true;

buttonIncreaseScale.addEventListener('click', () => {
  numberScaleValue += STEP_SCALE;
  scaleValue.value =  `${numberScaleValue}%`;

  if (numberScaleValue === MAX_SCALE) {
    buttonIncreaseScale.disabled = true;
  }
  buttonDecreaseScale.disabled = false;

  chsngeScale(numberScaleValue);
});

buttonDecreaseScale.addEventListener('click', () => {
  numberScaleValue -= STEP_SCALE;
  scaleValue.value =  `${numberScaleValue}%`;

  buttonIncreaseScale.disabled = false;
  if (numberScaleValue === MIN_SCALE) {
    buttonDecreaseScale.disabled = true;
  }

  chsngeScale(numberScaleValue);
});
