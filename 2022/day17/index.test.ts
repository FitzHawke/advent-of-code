import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2022';
const day = 'day17';
const answers = {
  ae: 3068,
  ai: 3224,
  be: 1514285714288,
  bi: 0,
};

let input = promises.readFile(
  resolve(process.cwd(), year, day, 'input.txt'),
  'utf8',
);
let example = promises.readFile(
  resolve(process.cwd(), year, day, 'example.txt'),
  'utf8',
);

describe(`${year}-${day}-Part A`, () => {
  it('should produce the correct value for example', async () => {
    expect(partA(await example, 2022)).toEqual(answers.ae);
  });
  it('should produce the correct value for input', async () => {
    expect(partA(await input, 2022)).toEqual(answers.ai);
  });
});

describe(`${year}-${day}-Part B`, () => {
  it('should produce the correct value for example', async () => {
    expect(partB(await example, 1000000000000)).toEqual(answers.be);
  });
  it.skip('should produce the correct value for input', async () => {
    expect(partB(await input, 1000000000000)).toEqual(answers.bi);
  });
});
