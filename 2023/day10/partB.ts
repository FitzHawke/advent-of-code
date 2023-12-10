import {
	dir,
	directions,
	findLoop,
	fullLoop,
	map,
	parseInput,
} from './partA.js';

const findInternal = (map: map, loop: fullLoop): number => {
	const leftSide = new Set<string>();
	const rightSide = new Set<string>();
	let insideLeft = true;
	let insideRight = true;

	const testEmptySpace = (
		r: number,
		c: number,
		dir: dir,
		lr: 'l' | 'r',
	): void => {
		const newR = r + directions[dir][0];
		const newC = c + directions[dir][1];
		const newLoc = [newR, newC].join('-');
		const loopPoss = ['left', 'right', 'up', 'down'].map((tstDir) =>
			[newLoc, tstDir].join('-'),
		);
		if (
			!loopPoss.some((cur) => loop.has(cur)) &&
			map.map.has([newR, newC].join('-'))
		) {
			if (insideLeft && lr === 'l' && !leftSide.has(newLoc)) {
				leftSide.add(newLoc);
				for (const dir of Object.keys(directions) as dir[]) {
					testEmptySpace(newR, newC, dir, lr);
				}
			} else if (insideRight && lr === 'r' && !rightSide.has(newLoc)) {
				rightSide.add(newLoc);
				for (const dir of Object.keys(directions) as dir[]) {
					testEmptySpace(newR, newC, dir, lr);
				}
			}
		} else if (map.map.get([newR, newC].join('-')) === undefined) {
			lr === 'l' ? (insideLeft = false) : (insideRight = false);
		}
	};

	const walkLoop = (): void => {
		let prevDir = map.endDir;
		loop.forEach((loc) => {
			const [r, c, curDir] = loc.split('-');

			if (curDir === 'left') {
				if (insideRight) {
					testEmptySpace(+r, +c, 'up', 'r');
					if (prevDir === 'up') testEmptySpace(+r, +c, 'right', 'r');
				}
				if (insideLeft) {
					testEmptySpace(+r, +c, 'down', 'l');
					if (prevDir === 'down') testEmptySpace(+r, +c, 'right', 'l');
				}
			} else if (curDir === 'right') {
				if (insideRight) {
					testEmptySpace(+r, +c, 'down', 'r');
					if (prevDir === 'down') testEmptySpace(+r, +c, 'left', 'r');
				}
				if (insideLeft) {
					testEmptySpace(+r, +c, 'up', 'l');
					if (prevDir === 'up') testEmptySpace(+r, +c, 'left', 'l');
				}
			} else if (curDir === 'up') {
				if (insideRight) {
					testEmptySpace(+r, +c, 'right', 'r');
					if (prevDir === 'right') testEmptySpace(+r, +c, 'down', 'r');
				}
				if (insideLeft) {
					testEmptySpace(+r, +c, 'left', 'l');
					if (prevDir === 'left') testEmptySpace(+r, +c, 'down', 'l');
				}
			} else if (curDir === 'down') {
				if (insideRight) {
					testEmptySpace(+r, +c, 'left', 'r');
					if (prevDir === 'left') testEmptySpace(+r, +c, 'up', 'r');
				}
				if (insideLeft) {
					testEmptySpace(+r, +c, 'right', 'l');
					if (prevDir === 'right') testEmptySpace(+r, +c, 'up', 'l');
				}
			}
			prevDir = curDir;
		});
	};

	walkLoop();
	return insideLeft ? leftSide.size : rightSide.size;
};

const main = (input: string): number => {
	const map = parseInput(input);
	const loop = findLoop(map);
	return findInternal(map, loop);
};

export default function (input: string): number {
	console.log('\nDay 10: Pipe Maze\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
