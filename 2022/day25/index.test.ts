import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2022';
const day = 'day25';
const answers = {
	ae: '2=-1=0',
	ai: '2-21=02=1-121-2-11-0',
	be: 'Merry Christmas 2022 :D',
	bi: 'Merry Christmas 2022 :D',
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
		expect(partA(await example)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(partA(await input)).toEqual(answers.ai);
	});
});

describe(`${year}-${day}-Part B`, () => {
	it('should produce the correct value for example', async () => {
		expect(partB(await example)).toEqual(answers.be);
	});
	it('should produce the correct value for input', async () => {
		expect(partB(await input)).toEqual(answers.bi);
	});
});
