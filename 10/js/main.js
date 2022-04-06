import { getData } from './api.js';
import { renderPhotoDataList } from './user-photos.js';
import { closeFilterModal } from './upload-photo-form.js';
import './validate-hashtag.js';
import { setUserFormSubmit } from './form.js';
import './scale-upload-photo.js';
import './effects.js';
import { showAlert } from './util.js';
import { showFilters, hiddenFilters, changeFilter, filterPhoto } from './filtres.js';

// const RERENDER_DELAY = 500;

getData(
  'https://25.javascript.pages.academy/kekstagram/data',
  (photos) => {
    renderPhotoDataList(photos);
    showFilters();
    changeFilter();
    filterPhoto();
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера. Повторите попытку');
    hiddenFilters();
  }
);

setUserFormSubmit(closeFilterModal);

