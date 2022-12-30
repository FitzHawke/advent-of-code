const isNiceString = (word: string): boolean => {
  let foundRepeat = false;
  for (let i = 2; i < word.length; i++) {
    if (word[i] === word[i - 2]) {
      foundRepeat = true;
      break;
    }
  }
  console.log(foundRepeat);
  if (!foundRepeat) return false;

  let foundPair = false;
  for (let i = 1; i < word.length; i++) {
    if (word.slice(i + 1).includes(word[i - 1] + word[i])) {
      foundPair = true;
      break;
    }
  }
  if (!foundPair) return false;

  return true;
};

const main = (input: string): number => {
  let niceCount = 0;
  for (const string of input.split('\n')) {
    if (isNiceString(string)) niceCount++;
  }
  return niceCount;
};

export default function (input: string): number {
  console.log("\nDay 05: Doesn't He Have Intern-Elves For This?\nPart B");
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
