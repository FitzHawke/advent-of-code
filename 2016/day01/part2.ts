import { parseInput, Walk } from './part1.ts';

const findIntersection = (directions: Walk[]): number => {
	const visited = new Set<string>();
	let idx = 0;
	const dirMod = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];
	let loc = [0, 0];
	const turn = new Map().set('L', -1).set('R', 1);

	for (const dir of directions) {
		idx = (4 + idx + turn.get(dir[0])) % 4;
		for (let i = 0; i < dir[1]; i++) {
			loc[0] += dirMod[idx][0];
			loc[1] += dirMod[idx][1];
			const locID = loc.join('_');
			if (visited.has(locID)) return Math.abs(loc[0]) + Math.abs(loc[1]);

			visited.add(locID);
		}
	}
	return 0;
};

const main = (input: string): number => {
	const directions = parseInput(input);
	return findIntersection(directions);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
