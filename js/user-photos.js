import { isEscapeKey, body } from './util.js';

const MIN_SHOWN_NUMBER_COMMENTS = 5;

const similarUserPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const usersPhotoList = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCounter = bigPicture.querySelector('.comments-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const buttonCloseBigPicture = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureOpen = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const onBigPictureClose = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUserPhotoEscKeydown);
};

const onUserPhotoEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    onBigPictureClose();
  }
};

const createComment = (item, index) => {
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

  if (index >= MIN_SHOWN_NUMBER_COMMENTS) {
    newComment.classList.add('hidden');
  }

  commentsList.append(newComment);
};

const renderPhoto = (photoData) => {
  const userPhotoElement = similarUserPhotoTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').src = photoData.url;
  userPhotoElement.querySelector('.picture__likes').textContent = photoData.likes;
  userPhotoElement.querySelector('.picture__comments').textContent = photoData.comments.length;

  usersPhotoList.append(userPhotoElement);

  userPhotoElement.addEventListener('click', () => {
    onBigPictureOpen();

    bigPictureImg.src = photoData.url;
    bigPictureLikes.textContent = photoData.likes;
    bigPictureCommentsCounter.textContent = photoData.comments.length;
    bigPictureCaption.textContent = photoData.description;

    commentsList.innerHTML = '';

    const comments = photoData.comments;

    const shownNumberComments = bigPicture.querySelector('.comments-number');
    const buttonShowMoreComments = bigPicture.querySelector('.social__comments-loader');

    buttonShowMoreComments.classList.remove('hidden');
    shownNumberComments.textContent = MIN_SHOWN_NUMBER_COMMENTS;

    if (comments.length <= MIN_SHOWN_NUMBER_COMMENTS) {
      buttonShowMoreComments.classList.add('hidden');
      shownNumberComments.textContent = comments.length;
    }

    comments.forEach(createComment);

    buttonShowMoreComments.addEventListener('click', () => {
      let hiddenComments = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));

      if (hiddenComments.length <= MIN_SHOWN_NUMBER_COMMENTS) {
        buttonShowMoreComments.classList.add('hidden');
        shownNumberComments.textContent = comments.length;
      } else {
        hiddenComments = hiddenComments.slice(0, MIN_SHOWN_NUMBER_COMMENTS);
        shownNumberComments.textContent = parseInt(shownNumberComments.textContent, 10) + MIN_SHOWN_NUMBER_COMMENTS;
      }

      hiddenComments.forEach((comment) => {
        comment.classList.remove('hidden');
      });
    });

    document.addEventListener('keydown', onUserPhotoEscKeydown);
  });
};

const renderPhotoDataList = (similarPhotoData) => {
  similarPhotoData.forEach((photoData) => {
    renderPhoto(photoData);
  });
};

buttonCloseBigPicture.addEventListener('click', onBigPictureClose);

export { usersPhotoList, renderPhotoDataList };

