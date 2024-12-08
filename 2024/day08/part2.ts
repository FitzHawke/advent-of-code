import { AntennaGrid, parseInput } from './part1.ts';

const findAntinodes = (grid: AntennaGrid): number => {
	const layout = grid.layout;
	const antinodes = new Set<string>();

	for (const l of Object.keys(grid.locations)) {
		const loc = grid.locations[l];
		for (let i = 0; i < loc.length - 1; i++) {
			for (let j = i + 1; j < loc.length; j++) {
				const [r1, c1] = loc[i].split('-').map(Number);
				const [r2, c2] = loc[j].split('-').map(Number);
				let dir1 = true;
				let dir2 = true;
				let k = 0;
				while (dir1 || dir2) {
					const a1 = [(k + 1) * r1 - k * r2, (k + 1) * c1 - k * c2].join('-');
					const a2 = [(k + 1) * r2 - k * r1, (k + 1) * c2 - k * c1].join('-');

					if (dir1 && layout.has(a1)) antinodes.add(a1);
					else dir1 = false;

					if (dir2 && layout.has(a2)) antinodes.add(a2);
					else dir2 = false;

					k++;
				}
			}
		}
	}

	return antinodes.size;
};

const main = (input: string): number => {
	const grid = parseInput(input);
	return findAntinodes(grid);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
