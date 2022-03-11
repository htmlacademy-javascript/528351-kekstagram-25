import { getPhotosData } from './data-photos.js';

const similarUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const useresPhotoList = document.querySelector('.pictures');

const numberOfPhotosDatas = 25;
const similarPhotoDatas = getPhotosData(numberOfPhotosDatas);
const similarListFragment = document.createDocumentFragment();

similarPhotoDatas.forEach(({ url, likes, comments }) => {
  const userPhotoElement = similarUserPhotoTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').src = url;
  userPhotoElement.querySelector('.picture__likes').textContent = likes;
  userPhotoElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.append(userPhotoElement);
});

useresPhotoList.append(similarListFragment);

export { useresPhotoList, similarPhotoDatas };
