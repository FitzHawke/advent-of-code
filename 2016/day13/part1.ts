export const parseInput = (input: string): number => {
	return Number(input.trimEnd());
};

export const dirs = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];

export const isWall = (r: number, c: number, magic: number): boolean => {
	const number = c * c + 3 * c + 2 * r * c + r + r * r + magic;
	const bin = number.toString(2);
	const ones = bin.split('').reduce((acc, c) => (c === '1' ? acc + 1 : acc), 0);
	return ones % 2 === 0;
};

const bfs = (rDest: number, cDest: number, magic: number): number => {
	const queue: [number, number, number][] = [[1, 1, 0]];
	const seen = new Set<string>();
	const known = new Map<string, boolean>();

	while (queue.length) {
		const [r, c, steps] = queue.shift();
		const id = [r, c].join('_');

		if (r === rDest && c === cDest) return steps;

		if (seen.has(id)) continue;
		else seen.add(id);

		for (const dir of dirs) {
			const r2 = r + dir[0];
			const c2 = c + dir[1];
			const id2 = [r2, c2].join('_');

			if (r2 < 0 || c2 < 0) continue;
			if (!known.has(id2)) known.set(id2, isWall(r2, c2, magic));

			if (known.get(id2)) {
				queue.push([r2, c2, steps + 1]);
			}
		}
	}
	return -1;
};

const main = (input: string, r: number, c: number): number => {
	const magicNumber = parseInput(input);
	return bfs(r, c, magicNumber);
};

export default function (
	input: string,
	title: string,
	r: number,
	c: number,
): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, r, c);
	console.timeEnd('Time elapsed');
	return result;
}
