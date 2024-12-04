export type dir = {
	x: -1 | 0 | 1;
	y: -1 | 0 | 1;
};

const dirs: dir[] = [
	{ x: 0, y: 1 },
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 1, y: 1 },
	{ x: 1, y: -1 },
	{ x: -1, y: 1 },
	{ x: -1, y: -1 },
];

export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

export const testInside = (puzzle: string[], x: number, y: number): boolean => {
	if (x < 0 || x >= puzzle[0].length || y < 0 || y >= puzzle.length)
		return false;
	else return true;
};

const testDir = (
	puzzle: string[],
	locX: number,
	locY: number,
	dir: dir,
): boolean => {
	const word = 'XMAS';
	for (let i = 1; i < word.length; i++) {
		const newX = locX + dir.x * i;
		const newY = locY + dir.y * i;
		if (!testInside(puzzle, newX, newY)) return false;
		if (puzzle[newY][newX] !== word[i]) return false;
	}
	return true;
};

const main = (input: string): number => {
	const puzzle = parseInput(input);
	let found = 0;

	for (let i = 0; i < puzzle.length; i++) {
		for (let j = 0; j < puzzle[0].length; j++) {
			if (puzzle[i][j] === 'X') {
				for (const dir of dirs) {
					if (testDir(puzzle, j, i, dir)) found++;
				}
			}
		}
	}
	return found;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
