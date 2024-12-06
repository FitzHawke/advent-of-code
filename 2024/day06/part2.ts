import { dirs, findStart, parseInput, walk } from './part1.ts';

const walkLoop = (
	oMap: string[][],
	r: number,
	c: number,
	poss: string,
): boolean => {
	const [tR, tC] = poss.split(',').map(Number);
	if (tR === r && tC === c) return false;

	const seenLoop = new Set<string>();
	let idx = 0;
	let curR = r;
	let curC = c;
	while (true) {
		let dir = dirs[idx % 4];
		
		let curLoc = [curR, curC, dir.r, dir.c].join(',')
		if (seenLoop.has(curLoc)) return true;
		else seenLoop.add(curLoc)

		const newR = curR + dir.r;
		const newC = curC + dir.c;

		if (newR < 0 || newR >= oMap.length || newC < 0 || newC >= oMap[0].length)
			break;
		if (oMap[newR][newC] === '#' || (newR === tR && newC === tC)) {
			idx++;
			continue;
		} else {
			curR = newR;
			curC = newC;
		}
	}
	return false;
};

const main = (input: string): number => {
	const oMap = parseInput(input);
	const startLoc = findStart(oMap).map(Number);
	oMap[startLoc[0]][startLoc[1]] = '.';
	const possiblities = walk(oMap, startLoc[0], startLoc[1]);
	let loops = 0;
	for (const poss of possiblities) {
		if (walkLoop(oMap, startLoc[0], startLoc[1], poss)) loops++;
	}
	return loops;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
