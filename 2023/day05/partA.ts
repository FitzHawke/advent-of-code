type almanac = {
	seeds: number[];
	maps: {
		[key:string]: almanacMap[];
	};
};

type almanacMap = {
	dstStart: number;
	dstEnd: number;
	srcStart: number;
	srcEnd: number
	rangeLen: number;
};

const parseInput = (input: string): almanac => {
	return input.split('\n\n').reduce((alm, cur, idx) => {
		if (idx === 0) {
			alm.seeds = cur.split(': ')[1].split(' ').map(Number);
			alm.maps = {}
		} else {
			const curMap = cur.split('\n')
			const name = curMap.shift()!.split(' ')[0]
			alm.maps[name] = curMap.map(dir => {
				const [dstStart, srcStart, rangeLen] = dir.split(' ').map(Number)
				const dstEnd = dstStart + rangeLen;
				const srcEnd = srcStart + rangeLen;
				return {dstStart, dstEnd, srcStart, srcEnd, rangeLen} as almanacMap
			})
		}
		return alm;
	}, {} as almanac);
};

const locateSeeds = (alm:almanac):number => {
	let lowestLoc = Infinity;

	for (const seed of alm.seeds) {
		let curVal = seed;
		for(const map in alm.maps) {
			for(const mapping of alm.maps[map]) {
				if (curVal<mapping.srcEnd && curVal >= mapping.srcStart) {
					curVal += mapping.dstStart - mapping.srcStart;
					break;
				}
			}
		}
		lowestLoc = Math.min(curVal, lowestLoc)
	}

	return lowestLoc;
}

const main = (input: string): number => {
	const alm = parseInput(input)
	return locateSeeds(alm);
};

export default function (input: string): number {
	console.log('\nDay 05: If You Give A Seed A Fertilizer\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
