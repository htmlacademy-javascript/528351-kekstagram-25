import { isEscapeKey, body } from './util.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const uploadPhotoInput = uploadPhotoForm.querySelector('#upload-file');
const redactorPhoto = uploadPhotoForm.querySelector('.img-upload__overlay');
const previewPhoto = uploadPhotoForm.querySelector('.img-upload__preview').querySelector('img');
const buttonCancel = uploadPhotoForm.querySelector('.img-upload__cancel');
const textComment = uploadPhotoForm.querySelector('.text__description');
const inputHashtags = uploadPhotoForm.querySelector('.text__hashtags');
const effectSlider =  uploadPhotoForm.querySelector('.effect-level__slider');

const smallPreviewPhotos = Array.from(uploadPhotoForm.querySelectorAll('.effects__preview'));

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

  previewPhoto.src = URL.createObjectURL(uploadPhotoInput.files[0]);

  smallPreviewPhotos.forEach((photo) => {
    photo.style.backgroundImage = `url(${URL.createObjectURL(uploadPhotoInput.files[0])})`;
  });

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
