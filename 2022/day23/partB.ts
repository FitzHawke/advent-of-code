import { Direction, makeMoves, parseIntoMap, proposeMoves } from './partA';

const main = (input: string): number => {
	const moveDirs: Direction[] = ['N', 'S', 'W', 'E'];
	const elves = parseIntoMap(input);
	let iters = 0;
	let done = false;
	while (!done) {
		iters++;
		const proposed = proposeMoves(elves, moveDirs);
		if (proposed.size === 0) {
			done = true;
			break;
		}
		makeMoves(elves, proposed);
		moveDirs.push(moveDirs.shift()!);
	}
	return iters;
};

export default function (input: string): number {
	console.log('\nDay 23: Unstable Diffusion\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
