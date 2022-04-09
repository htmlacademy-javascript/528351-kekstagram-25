import { getData } from './api.js';
import { renderPhotoDataList } from './user-photos.js';
import { closeFilterModal } from './upload-photo-form.js';
import './validate-hashtag.js';
import { setUserFormSubmit } from './form.js';
import './scale-upload-photo.js';
import './effects.js';
import { showFilters, hideFilters, initFilters, filterPhoto, showGetDataMessageError } from './filtres.js';

getData(
  'https://25.javascript.pages.academy/kekstagram/data2',
  (photos) => {
    renderPhotoDataList(photos);
    showFilters();
    initFilters();
    filterPhoto();
  },
  () => {
    showGetDataMessageError();
    hideFilters();
  }
);

setUserFormSubmit(closeFilterModal);

