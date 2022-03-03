
const getRundomArrayNumber = (length) => {
  const arr = Array.from({ length }, (_v, k) => k + 1);
  return arr.sort(() => Math.random() - 0.5);
};

getRundomArrayNumber(8);

