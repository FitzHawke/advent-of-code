export type Maze = {
	map: Map<string, string>;
	start: string;
	end: string;
};

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

export const directions = new Map<string, number[]>()
	.set('U', [-1, 0])
	.set('D', [1, 0])
	.set('L', [0, -1])
	.set('R', [0, 1]);

export const parseInput = (input: string): Maze => {
	const map = new Map<string, string>();
	let start = '';
	let end = '';

	input
		.trimEnd()
		.split('\n')
		.map((c, i) => {
			c.split('').map((d, j) => {
				map.set(idFromCoord(i, j), d);
				if (d === 'S') start = idFromCoord(i, j);
				if (d === 'E') end = idFromCoord(i, j);
			});
		});

	return { map, start, end };
};

const findPathVal = (maze: Maze): number => {
	const visited = new Map<string, number>();
	const queue: [string, string, number][] = [[maze.start, 'R', 0]];
	let bestPath = Infinity;

	while (queue.length > 0) {
		const [loc, curDir, curScore] = queue.shift();
		const [r, c] = coordFromId(loc);

		if (curScore >= bestPath) continue;
		if (visited.has(loc) && curScore > visited.get(loc)) continue;
		if (maze.map.get(loc) === 'E') {
			bestPath = curScore;
			continue;
		}

		visited.set(loc, curScore);

		for (const [dir, move] of directions) {
			const newR = r + move[0];
			const newC = c + move[1];
			const newId = idFromCoord(newR, newC);
			if (maze.map.get(newId) !== '#') {
				queue.push([
					newId,
					dir,
					dir === curDir ? curScore + 1 : curScore + 1001,
				]);
			}
		}
	}

	return bestPath;
};

const main = (input: string): number => {
	const maze = parseInput(input);
	return findPathVal(maze);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
