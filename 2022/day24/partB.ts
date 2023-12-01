import { calcMinMax, findPath, parseBlizzards } from './partA';

const main = (input: string): number => {
	const map = parseBlizzards(input);
	const minMax = calcMinMax(map[0]);
	const start = minMax.start.split(',').map(Number);
	const end = minMax.end.split(',').map(Number);

	let steps = findPath(map, minMax, start, end);
	steps = findPath(map, minMax, end, start, steps);
	steps = findPath(map, minMax, start, end, steps);

	return steps;
};

export default function (input: string): number {
	console.log('\nDay 24: Blizzard Basin\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
