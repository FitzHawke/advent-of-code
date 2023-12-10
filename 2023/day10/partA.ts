// Need to learn proper typescript for something like this. Found a way that works but feels very hacky.
// [pipe symbol _ direction traveling when entered: direction exited, locs on either side]
export const pipeConnections = {
	'|_up': ['up', ['left'], ['right']],
	'|_down': ['down', ['right'], ['left']],
	'-_left': ['left', ['up'], ['down']],
	'-_right': ['right', ['down'], ['up']],
	L_down: ['right', [], ['left', 'down']],
	L_left: ['up', ['left', 'down'], []],
	J_down: ['left', ['right', 'down'], []],
	J_right: ['up', [], ['right', 'down']],
	'7_up': ['left', [], ['right', 'up']],
	'7_right': ['down', ['right', 'up'], []],
	F_up: ['right', ['left', 'up'], []],
	F_left: ['down', [], ['left', 'up']],
};

// Row - Col
export const directions = {
	up: [-1, 0],
	down: [1, 0],
	left: [0, -1],
	right: [0, 1],
};

export type locMatrix = Map<string, string>;
export type fullLoop = Set<string>;
export type dir = 'up' | 'down' | 'left' | 'right';
export type map = {
	map: locMatrix;
	start: string;
	startDir?: string;
	endDir?: string;
};

export const parseInput = (input: string): map => {
	const map: locMatrix = new Map();
	let start = '';
	input.split('\n').map((rowCur, rowIdx) => {
		rowCur.split('').map((colCur, colIdx) => {
			map.set([rowIdx, colIdx].join('-'), colCur);
			if (colCur === 'S') start = [rowIdx, colIdx].join('-');
		});
	});
	return { map, start };
};

export const findLoop = (map: map): fullLoop => {
	for (const dir of Object.values(pipeConnections)) {
		let curLoc: string = map.start;
		let curDir = dir[0] as dir;
		const loop = new Set().add([map.start, curDir].join('-')) as fullLoop;
		while (true) {
			const [r, c] = curLoc.split('-')!.map(Number);
			const newR = r + directions[curDir]![0];
			const newC = c + directions[curDir]![1];
			const nextLoc = [newR, newC].join('-');
			const newPipe = map.map.get(nextLoc);
			if (newPipe === 'S') {
				map.startDir = dir[0] as dir;
				map.endDir = curDir;
				return loop;
			} else {
				const connection =
					pipeConnections[
						[newPipe, curDir].join('_') as keyof typeof pipeConnections
					];
				if (connection === undefined) break;
				curDir = connection[0] as dir;
				loop.add([nextLoc, curDir].join('-'));
				curLoc = nextLoc;
			}
		}
	}
	return new Set();
};

const main = (input: string): number => {
	const map = parseInput(input);
	const loop = findLoop(map);
	return Math.floor(loop.size / 2);
};

export default function (input: string): number {
	console.log('\nDay 10: Pipe Maze\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
