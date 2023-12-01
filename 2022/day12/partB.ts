type loc = [number, number];

const dirs: number[][] = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
];

const canStep = (cur: loc, target: loc, matrix: string[][]): boolean => {
	if (target[0] < 0 || target[0] >= matrix.length) return false;
	if (target[1] < 0 || target[1] >= matrix[0].length) return false;

	let current = matrix[cur[0]][cur[1]];
	let next = matrix[target[0]][target[1]];

	if (next.charCodeAt(0) - current.charCodeAt(0) >= -1) return true;
	return false;
};

export default function (input: string): number {
	const matrix: string[][] = input.split('\n').map((l) => l.split(''));
	const seen: Set<string> = new Set();
	let end: loc = [0, 0];

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			if (matrix[i][j] === 'E') {
				end = [i, j];
				matrix[i][j] = 'z';
			}

			if (matrix[i][j] === 'S') {
				matrix[i][j] = 'a';
			}
		}
	}

	let steps = 0;
	const queue: [loc, number][] = [[end, 0]];
	while (queue.length) {
		const [cur, count] = queue.shift()!;
		if (seen.has(cur.join('-'))) continue;
		if (matrix[cur[0]][cur[1]] === 'a') {
			steps = count;
			break;
		}
		seen.add(cur.join('-'));
		queue.push(
			...dirs
				.map(
					(dir) =>
						[[cur[0] + dir[0], cur[1] + dir[1]], count + 1] as [loc, number],
				)
				.filter((step) => canStep(cur, step[0], matrix)),
		);
	}

	return steps;
}
