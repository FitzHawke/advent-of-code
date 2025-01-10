type Maze = Map<string, string>;

type Position = {
	r: number;
	c: number;
};

type Instructions = {
	maze: Maze;
	ins: string[];
	robotPos: Position;
};

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

const dirs = new Map()
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

const moveRobot = (ins: Instructions) => {
	const maze = ins.maze;
	const fullIns = ins.ins.join('');
	const curPos = ins.robotPos;

	const makeMove = (r: number, c: number, dirStr: string): boolean => {
		const curVal = maze.get(idFromCoord(r, c));
		const offset = dirs.get(dirStr);
		const newR = r + offset[0];
		const newC = c + offset[1];

		if (curVal === '#') return false;

		if (
			maze.get(idFromCoord(newR, newC)) === '.' ||
			makeMove(newR, newC, dirStr)
		) {
			maze.set(idFromCoord(newR, newC), curVal);
			maze.set(idFromCoord(r, c), '.');
			return true;
		}
		return false;
	};

	for (const move of fullIns) {
		if (makeMove(curPos.r, curPos.c, move)) {
			const offset = dirs.get(move);
			curPos.r += offset[0];
			curPos.c += offset[1];
		}
	}
};

const calcBoxSum = (maze: Maze): number => {
	let count = 0;
	for (const [loc, type] of maze) {
		if (type === 'O') {
			const [r, c] = coordFromId(loc).map(Number);
			count += r * 100 + c;
		}
	}
	return count;
};

const main = (input: string): number => {
	const ins = parseInput(input);
	moveRobot(ins);
	return calcBoxSum(ins.maze);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
