export type Topography = Map<string, string>;
type Dir = [number,number,string]

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

export const dirs:Dir[] = [
	[-1, 0, 'n'],
	[0, 1, 'e'],
	[1, 0, 's'],
	[0, -1, 'w'],
];

export const parseInput = (input: string): Topography => {
	const topo = new Map() as Topography;

	input
		.trimEnd()
		.split('\n')
		.map((line, r) =>
			line.split('').map((reg, c) => {
				topo.set(idFromCoord(r, c), reg);
			}),
		);
	return topo;
};

const fenceRegions = (topo: Topography): number => {
	const visited = new Set<string>();
	let price = 0;

	const flood = (r: number, c: number, region: string): number => {
		const curRegion = new Set<string>();
		const rTest = [[r, c]];
		let edge = 0;

		while (rTest.length > 0) {
			const [curR, curC] = rTest.pop();
			const label = idFromCoord(curR, curC);

			if (!topo.has(label) || topo.get(label) !== region) {
				edge++;
			} else if (!curRegion.has(label)) {
				visited.add(label);
				curRegion.add(label);
				for (const dir of dirs) {
					rTest.push([curR + dir[0], curC + dir[1]]);
				}
			}
		}
		return curRegion.size * edge;
	};

	for (const [loc, reg] of topo) {
		if (!visited.has(loc)) {
			const [r, c] = coordFromId(loc);
			price += flood(r, c, reg);
		}
	}

	return price;
};

const main = (input: string): number => {
	return fenceRegions(parseInput(input));
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
