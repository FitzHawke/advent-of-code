import { dirs } from './partA';

const main = (input: string): number => {
  const visited = new Set().add('0,0');
  let x = 0,
    y = 0,
    rX = 0,
    rY = 0;
  for (let i = 0; i < input.length; i++) {
    if (i % 2) {
      x += dirs[input[i]][0];
      y += dirs[input[i]][1];
      visited.add([x, y].join(','));
    } else {
      rX += dirs[input[i]][0];
      rY += dirs[input[i]][1];
      visited.add([rX, rY].join(','));
    }
  }
  return visited.size;
};

export default function (input: string): number {
  console.log('\nDay 03: Perfectly Spherical Houses in a Vacuum\nPart B');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
