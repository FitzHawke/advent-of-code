import { dir, parseInput, testInside } from './part1.ts';

const dirs: dir[] = [
	{ x: 1, y: 1 },
	{ x: 1, y: -1 },
	{ x: -1, y: 1 },
	{ x: -1, y: -1 },
];

const testForX = (puzzle: string[], curX: number, curY: number): boolean => {
	let foundMAS = 0;

	for (const dir of dirs) {
		const testX = curX + dir.x;
		const testY = curY + dir.y;
		const oppX = curX - dir.x;
		const oppY = curY - dir.y;
		if (!testInside(puzzle, testX, testY) || !testInside(puzzle, oppX, oppY))
			return false;

		if (puzzle[testY][testX] === 'M' && puzzle[oppY][oppX] === 'S') foundMAS++;
	}

	if (foundMAS === 2) return true;
	return false;
};

const main = (input: string): number => {
	const puzzle = parseInput(input);
	let found = 0;

	for (let i = 0; i < puzzle.length; i++) {
		for (let j = 0; j < puzzle[0].length; j++) {
			if (puzzle[i][j] === 'A') {
				if (testForX(puzzle, j, i)) found++;
			}
		}
	}
	return found;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
