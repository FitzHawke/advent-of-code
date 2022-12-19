import { calcGeodes, parseData } from './partA';

const main = (input: string, time: number): number => {
  const blueprints = parseData(input);

  let quality = 1;
  for (const bp of blueprints.slice(0, 3)) {
    const qual = calcGeodes(bp, time);
    quality *= qual;
  }
  return quality;
};

export default function (input: string, time: number): number {
  console.log('\nDay 19: Not Enough Minerals\nPart B');
  const startTime = new Date();
  const result = main(input, time);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
