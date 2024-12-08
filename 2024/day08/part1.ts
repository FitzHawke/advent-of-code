export type AntennaGrid = {
	layout: Map<string, string>;
	locations: {
		[key: string]: string[];
	};
};

export const parseInput = (input: string): AntennaGrid => {
	const layout = new Map<string, string>();
	const locations = {} as { [key: string]: string[] };
	input
		.trimEnd()
		.split('\n')
		.map((c, i) =>
			c.split('').map((d, j) => {
				const id = [i, j].join('-');
				layout.set(id, d);
				if (!(d === '.')) {
					locations[d] ? locations[d].push(id) : (locations[d] = [id]);
				}
			}),
		);
	return { layout, locations };
};

const findAntinodes = (grid: AntennaGrid): number => {
	const layout = grid.layout;
	const antinodes = new Set<string>();

	for (const l of Object.keys(grid.locations)) {
		const loc = grid.locations[l];
		for (let i = 0; i < loc.length - 1; i++) {
			for (let j = i + 1; j < loc.length; j++) {
				const [r1, c1] = loc[i].split('-').map(Number);
				const [r2, c2] = loc[j].split('-').map(Number);

				const a1 = [2 * r1 - r2, 2 * c1 - c2].join('-');
				const a2 = [2 * r2 - r1, 2 * c2 - c1].join('-');

				if (layout.has(a1)) antinodes.add(a1);
				if (layout.has(a2)) antinodes.add(a2);
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
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
