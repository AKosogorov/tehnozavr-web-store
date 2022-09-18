export default function (word, count, noCountWord = "Товаров нет") {
  if (!count) return noCountWord;

  let wordEnding = "ов";

  if (count % 10 === 1) {
    wordEnding = "";
  } else if (
    (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) &&
    !(count % 100 >= 11 && count % 100 <= 19)
  ) {
    wordEnding = "а";
  }

  const computedWord = word + wordEnding;

  return `${count} ${computedWord}`;
}
