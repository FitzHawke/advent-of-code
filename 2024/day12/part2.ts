import {
	coordFromId,
	dirs,
	idFromCoord,
	parseInput,
	Topography,
} from './part1.ts';

const fenceRegions = (topo: Topography): number => {
	const visited = new Set<string>();
	let price = 0;

	const flood = (r: number, c: number, region: string): number => {
		const curRegion = new Set<string>();
		const edges = new Set<string>();
		const rTest = [[r, c, 'x']] as [number, number, string][];

		while (rTest.length > 0) {
			const [curR, curC, d] = rTest.pop();
			const label = idFromCoord(curR, curC);
			const label2 = label + `__${d}`;

			if (!topo.has(label) || topo.get(label) !== region) {
				edges.add(label2);
			} else if (!curRegion.has(label)) {
				visited.add(label);
				curRegion.add(label);
				for (const dir of dirs) {
					rTest.push([curR + dir[0], curC + dir[1], dir[2]]);
				}
			}
		}

		// I HATE THIS X(
		// ... but it works
		for (const edge of edges) {
			const [loc, d] = edge.split('__');
			const [r, c] = coordFromId(loc);
			for (const dir of dirs) {
				let i = 1;
				while (true) {
					const newR = r + i * dir[0];
					const newC = c + i * dir[1];
					const testLoc = `${newR}_${newC}__${d}`;
					if (edges.has(testLoc)) {
						edges.delete(testLoc);
						i++
					} else break;
				}
			}
		}

		return curRegion.size * edges.size;
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
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
