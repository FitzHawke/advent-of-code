import { parseInput, testEquation } from './part1.ts';

const main = (input: string): number => {
	const eqns = parseInput(input);
	let counter = 0;
	for (const eqn of eqns) {
		if (testEquation(eqn,2)) counter += eqn.ans;
	}
	return counter;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed')
	const result = main(input);
	console.timeEnd('Time elapsed')
	return result;
}
