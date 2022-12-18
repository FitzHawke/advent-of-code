import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2022';
const day = 'day16';
const answers = {
  ae: 1651,
  ai: 1850,
  be: 1707,
  bi: 2306,
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
    expect(partA(await example, 30)).toEqual(answers.ae);
  });
  it('should produce the correct value for input', async () => {
    expect(partA(await input, 30)).toEqual(answers.ai);
  });
});

describe(`${year}-${day}-Part B`, () => {
  it('should produce the correct value for example', async () => {
    expect(partB(await example, 26)).toEqual(answers.be);
  });
  it('should produce the correct value for input', async () => {
    expect(partB(await input, 26)).toEqual(answers.bi);
  });
});
