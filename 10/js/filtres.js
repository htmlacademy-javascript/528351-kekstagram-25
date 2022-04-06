// import { debounce } from './util.js';
const filterSection = document.querySelector('.img-filters');

const filterForm = filterSection.querySelector('.img-filters__form');
const buttonsOfFilter = Array.from(filterForm.querySelectorAll('.img-filters__button'));

const NUMBER_RANDOM_PHOTOS = 10;
// const RERENDER_DELAY = 500;

const showFilters = () => {
  filterSection.classList.remove('img-filters--inactive');
};

const hiddenFilters = () => {
  filterSection.classList.add('img-filters--inactive');
};

const changeFilter = () => {
  buttonsOfFilter.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const activeButton = filterForm.getElementsByClassName('img-filters__button--active');
      activeButton[0].classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    });
  });
};

const buttonDefault = filterForm.querySelector('#filter-default');
const buttonRandom = filterForm.querySelector('#filter-random');
const buttonDiscussed = filterForm.querySelector('#filter-discussed');

const filterPhoto = () => {
  const usersPhotoList = document.querySelector('.pictures');
  const userPhotos = Array.from(document.querySelectorAll('.picture'));

  const removePhotos = () => {
    userPhotos.forEach((photo) => {
      photo.remove();
    });
  };

  const addPhotos = (photos) => {
    photos.forEach((photo) => {
      usersPhotoList.append(photo);
    });
  };

  const getNumberComments = (photo) => photo.querySelector('.picture__comments').textContent;

  const compareComments = (photoA, photoB) => {
    const numberCommentsA = getNumberComments(photoA);
    const numberCommentsB = getNumberComments(photoB);

    return numberCommentsB - numberCommentsA;
  };

  const chouseButtonFilter = () => {
    buttonDefault.addEventListener('click', () => {
      removePhotos();
      addPhotos(userPhotos);
    });

    buttonRandom.addEventListener('click', () => {
      removePhotos();
      const rundomUserPhotos = userPhotos.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_RANDOM_PHOTOS);
      addPhotos(rundomUserPhotos);
    });

    buttonDiscussed.addEventListener('click', () => {
      removePhotos();
      const discussedPhotos = userPhotos.slice().sort(compareComments);
      addPhotos(discussedPhotos);
    });
  };

  // debounce(chouseButtonFilter(),RERENDER_DELAY);
  chouseButtonFilter();
};


export { showFilters, hiddenFilters, changeFilter, filterPhoto };

