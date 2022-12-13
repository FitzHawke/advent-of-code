import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const day = 'day13';
const answers = {
  ae: 0,
  ai: 0,
  be: 0,
  bi: 0,
};

let input = promises.readFile(resolve(process.cwd(), day, 'input.txt'), 'utf8');
let example = promises.readFile(
  resolve(process.cwd(), day, 'example.txt'),
  'utf8',
);

describe('Part A', () => {
  it('should produce the correct value for example', async () => {
    expect(partA(await example)).toEqual(answers.ae);
  });
  it.skip('should produce the correct value for input', async () => {
    expect(partA(await input)).toEqual(answers.ai);
  });
});

describe('Part B', () => {
  it('should produce the correct value for example', async () => {
    expect(partB(await example)).toEqual(answers.be);
  });
  it.skip('should produce the correct value for input', async () => {
    expect(partB(await input)).toEqual(answers.bi);
  });
});
