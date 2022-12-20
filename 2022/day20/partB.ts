import { calculateCoords, mixer, parseInputs } from './partA';

const main = (input: string): number => {
  const key = 811589153;
  const numList = parseInputs(input, key);
  const mixed = mixer(numList.nums, 10);
  return calculateCoords(mixed, numList.z);
};

export default function (input: string): number {
  console.log('\nDay 20: Title\nPart B');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
