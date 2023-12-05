import { almanac, parseInput } from './partA.js';
type seedRange = [number, number];

const locateManySeeds = (alm: almanac): number => {
	let seeds = new Set<seedRange>;
	for (let i = 0; i < alm.seeds.length; i += 2) {
		seeds.add([alm.seeds[i], alm.seeds[i] + alm.seeds[i + 1]]);
	}

	for (const map in alm.maps) {
		let mapped: seedRange[] = [];

		for (const mapping of alm.maps[map]) {
			const difference = mapping.dstStart - mapping.srcStart;

			for (const seed of seeds) {
				if (seed[0] <= mapping.srcEnd && seed[1] >= mapping.srcStart) {
					if (seed[0] < mapping.srcStart && seed[1] <= mapping.srcEnd) {
						mapped.push([mapping.dstStart, seed[1] + difference]);
						seeds.add([seed[0], mapping.srcStart - 1]);
					} else if (seed[0] < mapping.srcStart && seed[1] > mapping.srcEnd) {
						mapped.push([mapping.dstStart, mapping.dstEnd]);
						seeds.add([mapping.srcEnd + 1, seed[1]]);
						seeds.add([seed[0], mapping.srcStart - 1]);
					} else if (seed[0] >= mapping.srcStart && seed[1] > mapping.srcEnd) {
						mapped.push([seed[0] + difference, mapping.dstEnd]);
						seeds.add([mapping.srcEnd + 1,seed[1]])
					} else if (seed[0] >= mapping.srcStart && seed[1] <= mapping.srcEnd) {
						mapped.push([seed[0] + difference, seed[1] + difference]);
					}
					seeds.delete(seed);
				}
			}
		}
		mapped.map(cur=>seeds.add(cur));
		mapped = []
	}

	return [...seeds].reduce((val, cur) => (cur[0] < val ? cur[0] : val), Infinity);
};

const main = (input: string): number => {
	const alm = parseInput(input);
	return locateManySeeds(alm);
};

export default function (input: string): number {
	console.log('\nDay 05: If You Give A Seed A Fertilizer\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
