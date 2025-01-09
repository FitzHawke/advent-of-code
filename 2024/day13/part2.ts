import { findBestPlay, parseInput } from './part1.ts';

const main = (input: string): number => {
	return parseInput(input).reduce((acc, c) => acc + findBestPlay(c, 10000000000000), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
