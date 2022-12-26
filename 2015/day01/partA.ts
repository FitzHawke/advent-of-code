const main = (input: string): number => {
  let floor = 0;
  for (const char of input) {
    if (char === '(') floor++;
    else if (char === ')') floor--;
  }
  return floor;
};

export default function (input: string): number {
  console.log('\nDay 01: Not Quite Lisp\nPart A');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
