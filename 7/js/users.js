import { getPhotosData } from './data-photos.js';

const similarUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const usersPhotoList = document.querySelector('.pictures');

const PHOTOS_COUNT = 25;
const similarPhotoData = getPhotosData(PHOTOS_COUNT);
const similarListFragment = document.createDocumentFragment();

similarPhotoData.forEach(({ url, likes, comments }) => {
  const userPhotoElement = similarUserPhotoTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').src = url;
  userPhotoElement.querySelector('.picture__likes').textContent = likes;
  userPhotoElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.append(userPhotoElement);
});

usersPhotoList.append(similarListFragment);

export { usersPhotoList, similarPhotoData };
