import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2022';
const day = 'day19';
const answers = {
  ae: 33,
  ai: 1127,
  be: 3472,
  bi: 21546,
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
    expect(partA(await example, 24)).toEqual(answers.ae);
  });
  it('should produce the correct value for input', async () => {
    expect(partA(await input, 24)).toEqual(answers.ai);
  });
});

describe(`${year}-${day}-Part B`, () => {
  it('should produce the correct value for example', async () => {
    expect(partB(await example, 32)).toEqual(answers.be);
  });
  it('should produce the correct value for input', async () => {
    expect(partB(await input, 32)).toEqual(answers.bi);
  });
});
