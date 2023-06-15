function createArrayOfRandomNumbers(max, randomNumberCount) {
  const randomNumbers = [];
  do {
    const randomNumber = Math.floor((Math.random() * (max + 1)));
    const isArrayIncludeThisNumber = randomNumbers.includes(randomNumber);
    if (!isArrayIncludeThisNumber) randomNumbers.push(randomNumber);
  } while (randomNumbers.length < randomNumberCount);
  return randomNumbers;
}

function createRandomNumber(max) {
  const randomNumber = Math.floor((Math.random() * (max + 1)));
  return randomNumber;
}

function createRandomNonZeroNumber(max) {
  const randomNonZeroNumber = Math.floor((1 + Math.random() * max));
  return randomNonZeroNumber;
}

module.exports = { createRandomNumber, createArrayOfRandomNumbers, createRandomNonZeroNumber };
