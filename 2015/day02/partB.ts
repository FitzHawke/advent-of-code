const findRibbonNeeded = (box: string): number => {
  const dims = box
    .split('x')
    .map(Number)
    .sort((a, b) => a - b);

  return 2 * dims[0] + 2 * dims[1] + dims.reduce((acc, dim) => (acc *= dim), 1);
};

const main = (input: string): number => {
  const boxes = input.split('\n');
  let needed = 0;
  for (const box of boxes) {
    needed += findRibbonNeeded(box);
  }
  return needed;
};

export default function (input: string): number {
  console.log('\nDay 02: I Was Told There Would Be No Math\nPart B');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
