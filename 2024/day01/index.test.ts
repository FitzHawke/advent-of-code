import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA.js';
import partB from './partB.js';

const title = 'Historian Hysteria'
const year = '2024';
const day = 'day01';
const answers = {
	ae: 11,
	ai: 1319616,
	be: 31,
	bi: 27267728,
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
		expect(partA(await example, title)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(partA(await input, title)).toEqual(answers.ai);
	});
});

describe(`${year}-${day}-Part B`, () => {
	it('should produce the correct value for example', async () => {
		expect(partB(await example, title)).toEqual(answers.be);
	});
	it('should produce the correct value for input', async () => {
		expect(partB(await input, title)).toEqual(answers.bi);
	});
});
