import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import partA from './partA';
import partB from './partB';

const year = '2015';
const day = 'day02';
const answers = {
	ae: 101,
	ai: 1606483,
	be: 48,
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
