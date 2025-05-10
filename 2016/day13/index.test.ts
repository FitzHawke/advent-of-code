import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import part1 from './part1.ts';
import part2 from './part2.ts';

const title = 'A Maze of Twisty Little Cubicles';
const year = '2016';
const day = '13';

const fullTitle = `${year} Day ${day} - ${title}`;
const path = `${year}/day${day}`;

const answers = {
	ae: 11,
	ai: -2,
	be: -1,
	bi: -1,
};

let input = promises.readFile(
	resolve(process.cwd(), path, 'input.txt'),
	'utf8',
);
let example = promises.readFile(
	resolve(process.cwd(), path, 'example.txt'),
	'utf8',
);

describe(`${year}-day${day}-Part 1`, () => {
	it('should produce the correct value for example', async () => {
		expect(part1(await example, fullTitle, 4, 7)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(part1(await input, fullTitle, 39, 31)).toEqual(answers.ai);
	});
});

describe(`${year}-day${day}-Part 2`, () => {
	it('should produce the correct value for example', async () => {
		expect(part2(await example, fullTitle)).toEqual(answers.be);
	});
	it('should produce the correct value for input', async () => {
		expect(part2(await input, fullTitle)).toEqual(answers.bi);
	});
});
