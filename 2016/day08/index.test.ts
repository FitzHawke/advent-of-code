import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import part1 from './part1.ts';
import part2 from './part2.ts';

const title = 'Two-Factor Authentication';
const year = '2016';
const day = '08';

const fullTitle = `${year} Day ${day} - ${title}`;
const path = `${year}/day${day}`;

const answers = {
	ae: 8,
	ai: 119,
	bi: [
		'XXXX_XXXX_X__X_XXXX__XXX_XXXX__XX___XX__XXX___XX__',
		'___X_X____X__X_X____X____X____X__X_X__X_X__X_X__X_',
		'__X__XXX__XXXX_XXX__X____XXX__X__X_X____X__X_X__X_',
		'_X___X____X__X_X_____XX__X____X__X_X_XX_XXX__X__X_',
		'X____X____X__X_X_______X_X____X__X_X__X_X____X__X_',
		'XXXX_X____X__X_X____XXX__X_____XX___XXX_X_____XX__',
	], // ZFHFSFOGPO
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
		expect(part1(await example, fullTitle, 7, 3)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(part1(await input, fullTitle, 50, 6)).toEqual(answers.ai);
	});
});

describe(`${year}-day${day}-Part 2`, () => {
	it('should produce the correct value for input', async () => {
		expect(part2(await input, fullTitle, 50, 6)).toEqual(answers.bi.join('\n'));
	});
});
