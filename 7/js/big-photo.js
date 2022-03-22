import { usersPhotoList, similarPhotoData } from './users.js';
import { isEscapeKey } from './util.js';

const useresPhotoItems = Array.from(usersPhotoList.querySelectorAll('.picture'));
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCounter = bigPicture.querySelector('.comments-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const buttonCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

const commentCouner = bigPicture.querySelector('.social__comment-count');
const commentLoader= bigPicture.querySelector('.comments-loader');

const createComment = (item) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const newCommentImg = document.createElement('img');
  newCommentImg.classList.add('social__picture');
  newCommentImg.src = item.avatar;
  newCommentImg.alt = item.name;
  newCommentImg.width = '35';
  newCommentImg.height = '35';
  newComment.append(newCommentImg);

  const newCommentText = document.createElement('p');
  newCommentText.textContent = item.message;
  newComment.append(newCommentText);

  commentsList.append(newComment);
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};


const getBigPicture = (count) => {
  openModal();

  commentCouner.classList.add('hidden'); //Временно
  commentLoader.classList.add('hidden'); //Временно

  const photoData = similarPhotoData[count];

  bigPictureImg.src = photoData.url;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureCommentsCounter.textContent = photoData.comments.length;
  bigPictureCaption.textContent = photoData.description;

  commentsList.innerHTML = '';

  photoData.comments.forEach(createComment);
};


useresPhotoItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    getBigPicture(i);
  });
});

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    closeModal();
  }
});

buttonCloseBigPicture.addEventListener('click', closeModal);

export { body };
