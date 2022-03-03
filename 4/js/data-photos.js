import {getRandomNumber, getRandomArray, getRandomArrayElement} from './util.js';

const NAMES = [
  'Иван',
  'Артем',
  'Сергей',
  'Дарья',
  'Мария',
  'Ольга',
  'Евгений',
  'Олег',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.',
];

const MAX_NUMBER_COMMENTS = 4;
const MAX_NUMBER_ARRAY_COMMENTS = 100;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const comments = [];

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomNumber(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

getRandomArray(MAX_NUMBER_ARRAY_COMMENTS).forEach((value) => {
  comments.push(createComment(value));
});

const getRandomArrayOfComments = (arr) => {
  const newArray = [];
  for (let i = 1; i <= getRandomNumber(1,MAX_NUMBER_COMMENTS); i++) {
    newArray.push(getRandomArrayElement(arr));
  }
  return newArray;
};

const createPhotoDescription = (number) => ({
  id: number,
  url: `photos/${number}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: getRandomArrayOfComments(comments),
});

const getPhotosData = (count) => getRandomArray(count).map((value) => createPhotoDescription(value));

getPhotosData(25);
