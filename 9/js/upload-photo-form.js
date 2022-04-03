import { isEscapeKey, body } from './util.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const uploadPhotoInput = uploadPhotoForm.querySelector('#upload-file');
const redactorPhoto = uploadPhotoForm.querySelector('.img-upload__overlay');
const previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview').querySelector('img');
const buttonCancel = uploadPhotoForm.querySelector('.img-upload__cancel');
const textComment = uploadPhotoForm.querySelector('.text__description');
const inputHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const effectSlider =  uploadPhotoForm.querySelector('.effect-level__slider');

const openFilterModal = () => {
  redactorPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeFilterModal = () => {
  redactorPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  inputHashtags.value = '';
  textComment.value = '';
  previewPhoto.style.transform = 'scale(1)';
  previewPhoto.style.filter = '';
  previewPhoto.className = 'effects__preview--none';
  previewPhoto.dataset.filterName = '';
  effectSlider.classList.add('visually-hidden');
};

uploadPhotoInput.addEventListener('change', () => {
  if (uploadPhotoInput.value.length !== 0) {
    openFilterModal();
  }
  //источник: https://ru.stackoverflow.com/questions/1026600/%D0%BA%D0%B0%D0%BA-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D1%83-%D1%87%D0%B5%D1%80%D0%B5%D0%B7-input;
  previewPhoto.src = URL.createObjectURL(uploadPhotoInput.files[0]);

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      closeFilterModal();
      uploadPhotoInput.value = '';
    }
  });
});

buttonCancel.addEventListener(('click'), () => {
  closeFilterModal();
  uploadPhotoInput.value = '';
});

export { uploadPhotoForm, previewPhoto, closeFilterModal };
