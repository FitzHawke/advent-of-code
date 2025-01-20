import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import part1 from './part1.ts';
import part2 from './part2.ts';

const title = 'Chronospatial Computer';
const year = '2024';
const day = '17';

const fullTitle = `${year} Day ${day} - ${title}`;
const path = `${year}/day${day}`;

const answers = {
	ae: '4,6,3,5,6,3,5,2,1,0',
	ai: '4,3,2,6,4,5,3,2,4',
	be: 117440,
	bi: 164540892147389,
};

let input = promises.readFile(
	resolve(process.cwd(), path, 'input.txt'),
	'utf8',
);
let example = promises.readFile(
	resolve(process.cwd(), path, 'example.txt'),
	'utf8',
);
let example2 = promises.readFile(
	resolve(process.cwd(), path, 'example2.txt'),
	'utf8',
);

describe(`${year}-day${day}-Part 1`, () => {
	it('should produce the correct value for example', async () => {
		expect(part1(await example, fullTitle)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(part1(await input, fullTitle)).toEqual(answers.ai);
	});
});

describe(`${year}-day${day}-Part 2`, () => {
	it('should produce the correct value for example2', async () => {
		expect(part2(await example2, fullTitle)).toEqual(answers.be);
	});
	it('should produce the correct value for input', async () => {
		expect(part2(await input, fullTitle)).toEqual(answers.bi);
	});
});
