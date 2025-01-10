import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import part1 from './part1.ts';
import part2 from './part2.ts';

const title = 'Warehouse Woes';
const year = '2024';
const day = '15';

const fullTitle = `${year} Day ${day} - ${title}`;
const path = `${year}/day${day}`;

const answers = {
	ae0: 2028,
	ae: 10092,
	ai: 1505963,
	be: 9021,
	bi: 1543141,
};

let input = promises.readFile(
	resolve(process.cwd(), path, 'input.txt'),
	'utf8',
);
let example0 = promises.readFile(
	resolve(process.cwd(), path, 'example0.txt'),
	'utf8',
);
let example = promises.readFile(
	resolve(process.cwd(), path, 'example.txt'),
	'utf8',
);

describe(`${year}-day${day}-Part 1`, () => {
	it('should produce the correct value for example0', async () => {
		expect(part1(await example0, fullTitle)).toEqual(answers.ae0);
	});
	it('should produce the correct value for example', async () => {
		expect(part1(await example, fullTitle)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(part1(await input, fullTitle)).toEqual(answers.ai);
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
