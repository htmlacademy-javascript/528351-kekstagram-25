// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random;
const getRandomNumber = (firstNumber, secondNumber) => {
  let min = firstNumber;
  let max = secondNumber;
  if (firstNumber > secondNumber) {
    min = secondNumber;
    max = firstNumber;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки максимальной длины строки.
const checkMaxLength = (text, maxNumberOfSymbols) => text.length <= maxNumberOfSymbols;

checkMaxLength('привет', 4);

//Функция, которая возвращает массив перемешенных чисел от 1 до length
//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const getRandomArray = (length) => {
  const arr = Array.from({ length }, (_v, k) => k + 1);
  return arr.sort(() => Math.random() - 0.5);
};

// Функция, возрвращающая случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomNumber, getRandomArray, getRandomArrayElement, isEscapeKey };
