import { describe, bench } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = 'tempYear';
const day = 'tempDay';

let input = promises.readFile(
  resolve(process.cwd(), year, day, 'input.txt'),
  'utf8',
);
let example = promises.readFile(
  resolve(process.cwd(), year, day, 'example.txt'),
  'utf8',
);

describe(`${year}-${day}-Part A`, () => {
  bench('Examples', async () => {
    partA(await example);
  });

  bench('Input', async () => {
    partA(await input);
  });
});

describe(`${year}-${day}-Part A`, () => {
  bench('Examples', async () => {
    partB(await example);
  });

  bench('Input', async () => {
    partB(await input);
  });
});
