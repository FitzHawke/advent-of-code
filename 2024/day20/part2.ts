import { findBestPath, findShortcuts, parseInput } from './part1.ts';

const main = (input: string, num: number): number => {
	const maze = parseInput(input);
	const dist = findBestPath(maze);
	return findShortcuts(dist, 20, num);
};

export default function (input: string, title: string, num: number): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, num);
	console.timeEnd('Time elapsed');
	return result;
}
