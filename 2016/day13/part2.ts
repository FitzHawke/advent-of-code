import { dirs, isWall, parseInput } from './part1.ts';

const bfs = (magic: number): number => {
	const queue: [number, number, number][] = [[1, 1, 0]];
	const seen = new Set<string>();
	const known = new Map<string, boolean>();

	while (queue.length) {
		const [r, c, steps] = queue.shift();
		const id = [r, c].join('_');

		if (seen.has(id)) continue;
		else seen.add(id);

		if (steps >= 50) continue;

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
	return seen.size;
};

const main = (input: string): number => {
	const magicNumber = parseInput(input);
	return bfs(magicNumber);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
