type loc = [number, number];
type dir = [-1 | 0 | 1, -1 | 0 | 1];

export const parseInput = (input: string): loc[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((c) => {
			const [a, b] = c.split(',').map(Number);
			return [b, a] as loc;
		});
};

export const jn = (char: string, ...args: (string | number)[]): string => {
	return args.join(char);
};
export const sp = (char: string, id: string): number[] => {
	return id.split(char).map(Number);
};

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);
export const dirs: dir[] = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

export const buildMap = (locList: loc[], bytes: number): Set<string> => {
	const corrupt = new Set<string>();
	for (let i = 0; i < bytes; i++) {
		const id = jn('_', locList[i][0], locList[i][1]);
		corrupt.add(id);
	}
	return corrupt;
};

const findPath = (corrupt: Set<string>, gridSize: number): number => {
	const queue: string[] = ['0_0_0'];
	const seen = new Map<string, number>();

	while (queue.length > 0) {
		const [r, c, num] = sp('_', queue.shift());
		if (r < 0 || r > gridSize) continue;
		if (c < 0 || c > gridSize) continue;
		const id = jn('_', r, c);
		if (corrupt.has(id)) continue;
		if (seen.has(id) && seen.get(id) <= num) continue;

		seen.set(id, num);
		for (const d of dirs) {
			const newR = r + d[0];
			const newC = c + d[1];
			queue.push(jn('_', newR, newC, num + 1));
		}
	}
	return seen.get(jn('_', gridSize, gridSize));
};

const main = (input: string, gridSize: number, bytes: number): number => {
	const coords = parseInput(input);
	const corrupt = buildMap(coords, bytes);
	return findPath(corrupt, gridSize);
};

export default function (
	input: string,
	title: string,
	gridSize: number,
	bytes: number,
): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, gridSize, bytes);
	console.timeEnd('Time elapsed');
	return result;
}
