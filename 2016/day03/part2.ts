import { parseInput } from './part1.ts';

const countTriangles = (maybes: number[][]): number => {
	let count = 0;

	for (let i = 0; i < maybes.length; i += 3) {
		for (let j = 0; j < 3; j++) {
			const [a, b, c] = [maybes[i][j], maybes[i + 1][j], maybes[i + 2][j]].sort(
				(a, b) => a - b,
			);
			if (a + b > c) count++;
		}
	}

	return count;
};

const main = (input: string): number => {
	const maybeTriangles = parseInput(input);
	return countTriangles(maybeTriangles);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
