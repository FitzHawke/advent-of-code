export type Dir = {
	r: -1 | 0 | 1;
	c: -1 | 0 | 1;
};

export const dirs: Dir[] = [
	{ r: -1, c: 0 },
	{ r: 0, c: 1 },
	{ r: 1, c: 0 },
	{ r: 0, c: -1 },
];


export const parseInput = (input: string): string[][] => {
	return input
	.trimEnd()
	.split('\n')
	.map((c) => c.split(''));
};

export const findStart = (oMap: string[][]): number[] => {
	for (let i = 0; i < oMap.length; i++) {
		for (let j = 0; j < oMap[0].length; j++) {
			if (oMap[i][j] === '^') return [i, j];
		}
	}
	return [-1, -1];
};

export const walk = (oMap: string[][], r: number, c: number): Set<string> => {
	const seen = new Set<string>();
	let idx = 0;
	let curR = r;
	let curC = c;
	while (true) {
		seen.add([curR, curC].join(','));
		let dir = dirs[idx % 4];
		const newR = curR + dir.r;
		const newC = curC + dir.c;

		if (newR < 0 || newR >= oMap.length || newC < 0 || newC >= oMap[0].length)
			break;
		if (oMap[newR][newC] === '#') {
			idx++;
		} else {
			curR = newR;
			curC = newC;
		}
	}
	return seen
};

const main = (input: string): number => {
	const oMap = parseInput(input);
	const startLoc = findStart(oMap).map(Number);
	oMap[startLoc[0]][startLoc[1]] = '.';
	return walk(oMap, startLoc[0], startLoc[1]).size;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
