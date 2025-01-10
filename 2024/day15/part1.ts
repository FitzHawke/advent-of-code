export type Maze = Map<string, string>;

type Position = {
	r: number;
	c: number;
};

export type Instructions = {
	maze: Maze;
	ins: string[];
	robotPos: Position;
};

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

export const dirs = new Map()
	.set('<', [0, -1])
	.set('^', [-1, 0])
	.set('>', [0, 1])
	.set('v', [1, 0]);

export const parseInput = (input: string): Instructions => {
	const [a, b] = input.trimEnd().split('\n\n');
	let robotPos = {} as Position;
	const maze = a.split('\n').reduce((acc, c, i) => {
		c.split('').map((d, j) => {
			acc.set(idFromCoord(i, j), d);
			if (d === '@') robotPos = { r: i, c: j };
		});
		return acc;
	}, new Map() as Maze);
	const ins = b.split('\n');
	return { maze, ins, robotPos };
};

export const moveRobot = (ins: Instructions) => {
	const maze = ins.maze;
	const fullIns = ins.ins.join('');
	const curPos = ins.robotPos;

	const testMove = (r: number, c: number, dirStr: string): boolean => {
		const offset = dirs.get(dirStr);
		const newR = r + offset[0];
		const newC = c + offset[1];

		const nextVal = maze.get(idFromCoord(newR, newC));
		if (nextVal === '#') return false;

		const doubleL = (dirStr === 'v' || dirStr === '^') && nextVal === ']';
		const doubleR = (dirStr === 'v' || dirStr === '^') && nextVal === '[';

		if (doubleL) {
			return testMove(newR, newC - 1, dirStr) && testMove(newR, newC, dirStr);
		} else if (doubleR) {
			return testMove(newR, newC, dirStr) && testMove(newR, newC + 1, dirStr);
		} else if (nextVal !== '.') {
			return testMove(newR, newC, dirStr);
		}

		return true;
	};

	const makeMove = (r: number, c: number, dirStr: string) => {
		const curVal = maze.get(idFromCoord(r, c));

		const offset = dirs.get(dirStr);
		const newR = r + offset[0];
		const newC = c + offset[1];

		const nextVal = maze.get(idFromCoord(newR, newC));
		const doubleL = (dirStr === 'v' || dirStr === '^') && nextVal === ']';
		const doubleR = (dirStr === 'v' || dirStr === '^') && nextVal === '[';

		if (doubleL) {
			makeMove(newR, newC - 1, dirStr);
			makeMove(newR, newC, dirStr);
		} else if (doubleR) {
			makeMove(newR, newC, dirStr);
			makeMove(newR, newC + 1, dirStr);
		} else if (nextVal !== '.') {
			makeMove(newR, newC, dirStr);
		}

		maze.set(idFromCoord(newR, newC), curVal);
		maze.set(idFromCoord(r, c), '.');
	};

	for (const move of fullIns) {
		if (testMove(curPos.r, curPos.c, move)) {
			makeMove(curPos.r, curPos.c, move);
			const offset = dirs.get(move);
			curPos.r += offset[0];
			curPos.c += offset[1];
		}
	}
};

export const calcBoxSum = (maze: Maze, boxID: string): number => {
	let count = 0;
	for (const [loc, type] of maze) {
		if (type === boxID) {
			const [r, c] = coordFromId(loc);
			count += r * 100 + c;
		}
	}
	return count;
};

const main = (input: string): number => {
	const ins = parseInput(input);
	moveRobot(ins);
	return calcBoxSum(ins.maze, 'O');
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
