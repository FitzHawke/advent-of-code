type spaceMap = Map<string, number>;

type FullMap = {
	spaceMap: spaceMap;
	length: number;
	width: number;
	galaxies: string[];
};

export const rc = (r: number, c: number): string => {
	return [r, c].join('-');
};

export const parseInput = (input: string): FullMap => {
	return input.split('\n').reduce(
		(acc, cur, idx) => {
			if (acc.length <= idx) acc.length = idx + 1;
			if (acc.width <= cur.length) acc.width = cur.length;
			cur.split('').map((curSpace, spIdx) => {
				const galaxy = curSpace === '#';
				acc.spaceMap.set(rc(idx, spIdx), 1);
				if (galaxy) acc.galaxies.push(rc(idx, spIdx));
			});
			return acc;
		},
		{
			spaceMap: new Map() as spaceMap,
			length: 0,
			width: 0,
			galaxies: [],
		} as FullMap,
	);
};

export const walkGalaxies = (fullMap: FullMap): number => {
	const morphSpace = (): void => {
		const colWithGal = new Set(
			fullMap.galaxies.map((cur) => cur.split('-')[1]),
		);
		for (let i = 0; i < fullMap.width; i++) {
			if (!colWithGal.has(String(i))) {
				for (let j = 0; j < fullMap.length; j++) {
					fullMap.spaceMap.set(rc(j, i), 2);
				}
			}
		}
		const rowWithGal = new Set(
			fullMap.galaxies.map((cur) => cur.split('-')[0]),
		);
		for (let i = 0; i < fullMap.length; i++) {
			if (!rowWithGal.has(String(i))) {
				for (let j = 0; j < fullMap.width; j++) {
					fullMap.spaceMap.set(rc(i, j), 2);
				}
			}
		}
	};
	
	const galaxyPairList = (): string[][] => {
		const pairs: string[][] = [];
		for (let i = 0; i < fullMap.galaxies.length; i++) {
			for (let j = i + 1; j < fullMap.galaxies.length; j++) {
				pairs.push([fullMap.galaxies[i], fullMap.galaxies[j]]);
			}
		}
		return pairs;
	};
	
	morphSpace();
	const galaxyPairs = galaxyPairList();
	let stepCount = 0;

	for (const pair of galaxyPairs) {
		const [[y1, x1], [y2, x2]] = pair.map((cur) => cur.split('-').map(Number));
		if (x1 !== x2) {
			for (
				let i = x1 + Math.sign(x2 - x1);
				Math.abs(i - x1) <= Math.abs(x2 - x1);
				i += Math.sign(x2 - x1)
			) {
				stepCount += fullMap.spaceMap.get(rc(y1, i))!;
			}
		}
		if (y1 !== y2) {
			for (
				let j = y1 + Math.sign(y2 - y1);
				Math.abs(j - y1) <= Math.abs(y2 - y1);
				j += Math.sign(y2 - y1)
			) {
				stepCount += fullMap.spaceMap.get(rc(j, x2))!;
			}
		}
	}

	return stepCount;
};

const main = (input: string): number => {
	const fullMap = parseInput(input);
	return walkGalaxies(fullMap);
};

export default function (input: string): number {
	console.log('\nDay 11: Cosmic Expansion\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
