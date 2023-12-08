import { countSteps, maps, parseInput } from './partA.js';

const lcm = (x: number, y: number): number => {
	for (let i = 1; i < y; i++) {
		if ((x * i) % y === 0) return x * i;
	}
	return x * y;
};

const walkRoutes = (maps: maps): number => {
	const startingPoints = Object.keys(maps.nodes).filter((cur) =>
		cur.endsWith('A'),
	);
	const cycleLengths = startingPoints.map((cur) => {
		return countSteps(maps, cur, (loc: string) => loc.endsWith('Z'));
	});
	// Using least common multiple. Works because my input cycles in a specific way.
	// May or may not work with other input datasets.
	let multiple = 1;
	for (const path of cycleLengths) {
		multiple = lcm(multiple, path);
	}
	return multiple;
};

const main = (input: string): number => {
	const allMaps = parseInput(input);
	return walkRoutes(allMaps);
};

export default function (input: string): number {
	console.log('\nDay 08: Haunted Wasteland\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
