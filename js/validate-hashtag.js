import { uploadPhotoForm } from './upload-photo-form.js';

const MAX_LENGTH_HASHTAGS = 5;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const inputHashtags = uploadPhotoForm.querySelector('.text__hashtags');

const isHashtagValid = (hashtag) => RE.test(hashtag);

const isNotSameElements = (hashtags) => {
  const lowercasedHashtags = hashtags.map((element) => element.toLowerCase());
  return hashtags.length === new Set(lowercasedHashtags).size;
};

const validateMaxLength = (hashtags, length) => hashtags.length <= length;

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'form__element',
  errorTextParent: 'form__element',
  errorTextClass: 'form__error-text',
});

const normalizeHashtags = (value) => {
  const hashtags = value.split(' ');
  return hashtags.filter((element) => element !== '');
};

const handlerLength = (value) => validateMaxLength(normalizeHashtags(value), MAX_LENGTH_HASHTAGS);

const handlerSameElements = (value) => isNotSameElements(normalizeHashtags(value));

const handlerHashtag = (value) => {
  if (value === '') {
    return true;
  } else {
    return normalizeHashtags(value).every((element) => isHashtagValid(element));
  }
};

pristine.addValidator(inputHashtags, handlerLength, `Максимальное количесвто хэштегов: ${MAX_LENGTH_HASHTAGS}`);

pristine.addValidator(inputHashtags, handlerSameElements, 'Один и тот же хэш-тег не может быть использован дважды');

pristine.addValidator(inputHashtags, handlerHashtag, 'хэш-тег начинается с символа # и может состоять только из букв и чисел, максимальная длина одного хэш-тега 20 символов, включая решётку');

export { pristine };
