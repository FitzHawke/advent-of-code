import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA.js';
import partB from './partB.js';

const year = '2023';
const day = 'day10';
const answers = {
	ae: 8,
	ai: 7173,
	be2: 4,
	be3:4,
	be4:8,
	be5:10,
	bi: 291,
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
let example3 = promises.readFile(
	resolve(process.cwd(), year, day, 'example3.txt'),
	'utf8',
);
let example4 = promises.readFile(
	resolve(process.cwd(), year, day, 'example4.txt'),
	'utf8',
);
let example5 = promises.readFile(
	resolve(process.cwd(), year, day, 'example5.txt'),
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
	it('should produce the correct value for example2', async () => {
		expect(partB(await example2)).toEqual(answers.be2);
	});
	it('should produce the correct value for example3', async () => {
		expect(partB(await example3)).toEqual(answers.be3);
	});
	it('should produce the correct value for example4', async () => {
		expect(partB(await example4)).toEqual(answers.be4);
	});
	it('should produce the correct value for example5', async () => {
		expect(partB(await example5)).toEqual(answers.be5);
	});
	it('should produce the correct value for input', async () => {
		expect(partB(await input)).toEqual(answers.bi);
	});
});
