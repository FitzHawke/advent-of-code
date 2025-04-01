import { calcPassCode, parseInput } from './part1.ts';

const main = (input: string): string => {
	const directions = parseInput(input);
	const keypad = [
		['X', 'X', 'X', 'X', 'X', 'X', 'X'],
		['X', 'X', 'X', '1', 'X', 'X', 'X'],
		['X', 'X', '2', '3', '4', 'X', 'X'],
		['X', '5', '6', '7', '8', '9', 'X'],
		['X', 'X', 'A', 'B', 'C', 'X', 'X'],
		['X', 'X', 'X', 'D', 'X', 'X', 'X'],
		['X', 'X', 'X', 'X', 'X', 'X', 'X'],
	];
	return calcPassCode(directions, keypad, [3, 1]);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
