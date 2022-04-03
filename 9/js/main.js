import { getData } from './api.js';
import { renderPhotoDataList } from './user-photos.js';
import { closeFilterModal } from './upload-photo-form.js';
import './validate-hashtag.js';
import { setUserFormSubmit } from './form.js';
import './scale-upload-photo.js';
import './effects.js';
import { showAlert } from './util.js';

getData(
  'https://25.javascript.pages.academy/kekstagram/data',
  renderPhotoDataList,
  showAlert,
  'Не удалось загрузить данные с сервера. Повторите попытку'
);

setUserFormSubmit(closeFilterModal);

