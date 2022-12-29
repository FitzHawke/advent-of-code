import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2015';
const day = 'day04';
const answers = {
  ae: 609043,
  ae2: 1048970,
  ai: 9958218,
  be: 0,
  be2: 0,
  bi: 9958218,
};

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
  it('should produce the correct value for example', async () => {
    expect(partA(await example)).toEqual(answers.ae);
  });
  it('should produce the correct value for example', async () => {
    expect(partA(await example2)).toEqual(answers.ae2);
  });
  it('should produce the correct value for input', async () => {
    expect(partA(await input)).toEqual(answers.ai);
  });
});

describe(`${year}-${day}-Part B`, () => {
  it.skip('should produce the correct value for example', async () => {
    expect(partB(await example)).toEqual(answers.be);
  });
  it.skip('should produce the correct value for example', async () => {
    expect(partB(await example2)).toEqual(answers.be2);
  });
  it('should produce the correct value for input', async () => {
    expect(partB(await input)).toEqual(answers.bi);
  });
});
