type maze = {
	start: string;
	end: string;
	layout: Map<string, string>;
};
type dir = [-1 | 0 | 1, -1 | 0 | 1];

export const jn = (char: string, ...args: (string | number)[]): string => {
	return args.join(char);
};
export const sp = (char: string, id: string): number[] => {
	return id.split(char).map(Number);
};
export const dirs: dir[] = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

export const parseInput = (input: string): maze => {
	const layout = new Map<string, string>();
	let start = '';
	let end = '';

	input
		.trimEnd()
		.split('\n')
		.map((a, r) =>
			a.split('').map((d, c) => {
				if (d === 'S') {
					start = jn('_', r, c);
					layout.set(start, '.');
				} else if (d === 'E') {
					end = jn('_', r, c);
					layout.set(end, '.');
				} else {
					layout.set(jn('_', r, c), d);
				}
			}),
		);
	return { start, end, layout };
};

export const findBestPath = (maze: maze): Map<string, number> => {
	const dist = new Map<string, number>();
	const queue = [jn('_', maze.end, '0')];

	while (queue.length > 0) {
		const [r, c, time] = sp('_', queue.shift());
		const cur = jn('_', r, c);

		if (!maze.layout.has(cur) || maze.layout.get(cur) === '#') continue;
		if (dist.has(cur) && dist.get(cur) <= time) continue;

		dist.set(cur, time);
		for (const d of dirs) {
			queue.push(jn('_', r + d[0], c + d[1], time + 1));
		}
	}
	return dist;
};

export const findShortcuts = (
	dist: Map<string, number>,
	jumpSize: number,
	minTimeSaved: number,
): number => {
	let count = 0;
	for (const [loc, timeToEnd] of dist) {
		for (let i = -jumpSize; i <= jumpSize; i++) {
			for (let j = -jumpSize; j <= jumpSize; j++) {
				const d = Math.abs(i) + Math.abs(j);
				if (d < 2 || d > jumpSize) continue;

				const [r, c] = sp('_', loc);
				const testLoc = jn('_', r + i, c + j);

				if (!dist.has(testLoc)) continue;
				if (dist.get(testLoc) >= timeToEnd + d) continue;

				const timeSaved = timeToEnd - dist.get(testLoc) - d;
				if (timeSaved >= minTimeSaved) {
					count++;
				}
			}
		}
	}
	return count;
};

const main = (input: string, num: number): number => {
	const maze = parseInput(input);
	const dist = findBestPath(maze);
	return findShortcuts(dist, 2, num);
};

export default function (input: string, title: string, num: number): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, num);
	console.timeEnd('Time elapsed');
	return result;
}
