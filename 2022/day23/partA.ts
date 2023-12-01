type LocMap = Set<string>;
type Proposed = Map<string, string>;

export type Direction = 'N' | 'S' | 'W' | 'E';

const lookDirection = {
	E: [
		[-1, 1],
		[0, 1],
		[1, 1],
	],
	W: [
		[-1, -1],
		[0, -1],
		[1, -1],
	],
	N: [
		[-1, -1],
		[-1, 0],
		[-1, 1],
	],
	S: [
		[1, -1],
		[1, 0],
		[1, 1],
	],
	scan: [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, 1],
		[1, 1],
		[1, 0],
		[1, -1],
		[0, -1],
	],
};

export const parseIntoMap = (input: string): LocMap => {
	const map = new Set() as LocMap;
	const ys = input.trim().split('\n');
	for (let i = 0; i < ys.length; i++) {
		for (let j = 0; j < ys[i].length; j++) {
			if (ys[i][j] === '#') map.add([i, j].join(','));
		}
	}
	return map;
};

const scanAround = (loc: string, elves: LocMap): boolean => {
	const [y, x] = loc.split(',').map(Number);
	for (const dir of lookDirection.scan) {
		if (elves.has([y + dir[0], x + dir[1]].join(','))) {
			return true;
		}
	}
	return false;
};

const canMove = (loc: string, elves: LocMap, direction: Direction): boolean => {
	const [y, x] = loc.split(',').map(Number);
	for (const dir of lookDirection[direction]) {
		if (elves.has([y + dir[0], x + dir[1]].join(','))) {
			return false;
		}
	}
	return true;
};

export const proposeMoves = (elves: LocMap, dirs: Direction[]): Proposed => {
	const proposed = new Map() as Proposed;
	const badMoves = [];
	for (const loc of elves) {
		if (scanAround(loc, elves)) {
			for (const dir of dirs) {
				if (canMove(loc, elves, dir)) {
					const [y, x] = loc.split(',').map(Number);
					const dest = [
						y + lookDirection[dir][1][0],
						x + lookDirection[dir][1][1],
					].join(',');
					if (proposed.has(dest)) {
						badMoves.push(dest);
					} else {
						proposed.set(dest, loc);
					}
					break;
				}
			}
		}
	}
	for (const move of badMoves) {
		proposed.delete(move);
	}
	return proposed;
};

export const makeMoves = (elves: LocMap, proposed: Proposed): void => {
	for (const [move, loc] of proposed) {
		elves.add(move);
		elves.delete(loc);
	}
};

const calcRectangle = (elves: LocMap): number => {
	let maxX = -Infinity,
		maxY = -Infinity;
	let minX = Infinity,
		minY = Infinity;
	for (const loc of elves) {
		const [y, x] = loc.split(',').map(Number);
		if (x < minX) minX = x;
		if (x > maxX) maxX = x;
		if (y < minY) minY = y;
		if (y > maxY) maxY = y;
	}
	return Math.abs((maxX - minX + 1) * (maxY - minY + 1)) - elves.size;
};

const main = (input: string): number => {
	const moveDirs: Direction[] = ['N', 'S', 'W', 'E'];
	const elves = parseIntoMap(input);
	for (let i = 0; i < 10; i++) {
		const proposed = proposeMoves(elves, moveDirs);
		makeMoves(elves, proposed);
		moveDirs.push(moveDirs.shift()!);
	}
	return calcRectangle(elves);
};

export default function (input: string): number {
	console.log('\nDay 23: Unstable Diffusion\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
