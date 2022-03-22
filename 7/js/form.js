/* eslint-disable no-unused-expressions */
import { body } from './big-photo.js';
import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const inputUploadFile = form.querySelector('#upload-file');
const redactorPhoto = form.querySelector('.img-upload__overlay');
const previewPhoto = form.querySelector('.img-upload__preview').querySelector('img');
const buttonCancel = form.querySelector('.img-upload__cancel');
const inputHashtags = form.querySelector('.text__hashtags');

const openFilter = () => {
  redactorPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFilter = () => {
  redactorPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
};

inputUploadFile.addEventListener('change', () => {
  if (inputUploadFile.value.length !== 0) {
    openFilter();
  }
  //источник: https://ru.stackoverflow.com/questions/1026600/%D0%BA%D0%B0%D0%BA-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D1%83-%D1%87%D0%B5%D1%80%D0%B5%D0%B7-input;
  previewPhoto.src = URL.createObjectURL(inputUploadFile.files[0]);
});

buttonCancel.addEventListener(('click'), () => {
  closeFilter();
  inputUploadFile.value = '';
});

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    closeFilter();
    inputUploadFile.value = '';
  }
});

// Валидация хэштегов
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const isHashtagValid = (hashtag) => re.test(hashtag);

const isNotSameElements = (array) => {
  const newArray = array.map((element) => element.toLowerCase());
  return array.length === new Set(newArray).size;
};

const isLengthLess5 = (array) => array.length <= 5;

const isInputHashtagValid = (array) => {
  let isValidInputHashtags = true;

  if (!isLengthLess5(array)) {
    isValidInputHashtags = false;
  }

  if (!isNotSameElements(array)) {
    isValidInputHashtags = false;
  }

  isValidInputHashtags = array.every((element) => isHashtagValid(element));

  return isValidInputHashtags;
};

const handler = (value) => {
  const hashtags = value.split(' ');

  if (value === '') {
    return true;
  } else {
    return isInputHashtagValid(hashtags);
  }
};

const pristine = new Pristine(form, {
  classTo: 'form__element',
  errorTextParent: 'form__element',
  errorTextClass: 'form__error-text',
});

pristine.addValidator(inputHashtags, handler, 'Измените хэштег(и)');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});


