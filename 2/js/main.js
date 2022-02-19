// Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRundomNumber(min, max) {
  if (min < 0 || max <= min) {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRundomNumber(1,4);

// Функция для проверки максимальной длины строки.
function checkMaxLength(text, maxNumberOfSymbols) {
  if (text.length >= maxNumberOfSymbols) {
    return false;
  }
  return true;
}

checkMaxLength('привет', 4);
