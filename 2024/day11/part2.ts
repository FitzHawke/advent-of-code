import { countStones, parseInput } from './part1.ts';

const main = (input: string): number => {
	return countStones(parseInput(input), 75);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
