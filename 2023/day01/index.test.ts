import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA.js';
import partB from './partB.js';

const year = '2023';
const day = 'day01';
const answers = {
	ae: 142,
	ai: 54940,
	be: 281,
	bi: 54208,
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
	it('should produce the correct value for input', async () => {
		expect(partA(await input)).toEqual(answers.ai);
	});
});

describe(`${year}-${day}-Part B`, () => {
	it('should produce the correct value for example', async () => {
		expect(partB(await example2)).toEqual(answers.be);
	});
	it('should produce the correct value for input', async () => {
		expect(partB(await input)).toEqual(answers.bi);
	});
});
