import { describe, bench } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2022';
const day = 'day09';

let input = promises.readFile(
  resolve(process.cwd(), year, day, 'input.txt'),
  'utf8',
);
let example = promises.readFile(
  resolve(process.cwd(), year, day, 'example.txt'),
  'utf8',
);
let example2 = promises.readFile(
  resolve(process.cwd(), year, day, 'example2.txt'),
  'utf8',
);

describe(`${year}-${day}-Part A`, () => {
  bench('Examples', async () => {
    partA(await example);
    partA(await example2);
  });

  bench('Input', async () => {
    partA(await input);
  });
});

describe(`${year}-${day}-Part B`, () => {
  bench('Examples', async () => {
    partB(await example);
    partB(await example2);
  });

  bench('Input', async () => {
    partB(await input);
  });
});
