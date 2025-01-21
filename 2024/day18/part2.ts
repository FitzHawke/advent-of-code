import { findCorrupted, findPath, jn, loc, parseInput } from './part1.ts';

const testForPath = (coords: loc[], gridSize: number): string => {
	let r = coords.length;
	let l = 0;
	while (r - l > 1) {
		const pt = Math.floor((l + r) / 2);
		const corrupt = findCorrupted(coords, pt);
		if (findPath(corrupt, gridSize) >= 0) l = pt;
		else r = pt;
	}
	return jn(',', coords[l][1], coords[l][0]);
};

const main = (input: string, gridSize: number): string => {
	const coords = parseInput(input);
	return testForPath(coords, gridSize);
};

export default function (
	input: string,
	title: string,
	gridSize: number,
): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, gridSize);
	console.timeEnd('Time elapsed');
	return result;
}
