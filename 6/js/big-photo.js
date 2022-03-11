import { useresPhotoList, similarPhotoDatas } from './users.js';

const useresPhotoItems = Array.from(useresPhotoList.getElementsByClassName('picture'));
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


useresPhotoItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    commentCouner.classList.add('hidden'); //Временно
    commentLoader.classList.add('hidden'); //Временно

    bigPictureImg.src = similarPhotoDatas[i].url;
    bigPictureLikes.textContent = similarPhotoDatas[i].likes;
    bigPictureCommentsCounter.textContent = similarPhotoDatas[i].comments.length;
    bigPictureCaption.textContent = similarPhotoDatas[i].description;

    commentsList.innerHTML = '';

    similarPhotoDatas[i].comments.forEach((comment) => {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');

      const newCommentImg = document.createElement('img');
      newCommentImg.classList.add('social__picture');
      newCommentImg.src = comment.avatar;
      newCommentImg.alt = comment.name;
      newCommentImg.width = '35';
      newCommentImg.height = '35';
      newComment.append(newCommentImg);

      const newCommentText = document.createElement('p');
      newCommentText.textContent = comment.message;
      newComment.append(newCommentText);

      commentsList.append(newComment);
    });
  });
});

document.addEventListener('keydown', (e) => {
  if( e.keyCode === 27 ) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

buttonCloseBigPicture.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});
