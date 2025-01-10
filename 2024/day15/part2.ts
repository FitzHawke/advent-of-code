import {
	calcBoxSum,
	coordFromId,
	idFromCoord,
	Instructions,
	Maze,
	moveRobot,
	parseInput,
} from './part1.ts';

const reBuildMap = (ins: Instructions) => {
	const newMaze = new Map() as Maze;
	for (const [loc, type] of ins.maze) {
		const [r, c] = coordFromId(loc);
		switch (type) {
			case '#':
				newMaze.set(idFromCoord(r, c * 2), '#');
				newMaze.set(idFromCoord(r, c * 2 + 1), '#');
				break;
			case 'O':
				newMaze.set(idFromCoord(r, c * 2), '[');
				newMaze.set(idFromCoord(r, c * 2 + 1), ']');
				break;
			case '.':
				newMaze.set(idFromCoord(r, c * 2), '.');
				newMaze.set(idFromCoord(r, c * 2 + 1), '.');
				break;
			case '@':
				newMaze.set(idFromCoord(r, c * 2), '@');
				newMaze.set(idFromCoord(r, c * 2 + 1), '.');
				ins.robotPos.c = c * 2;
				break;
			default:
				break;
		}
	}
	ins.maze = newMaze;
};

const main = (input: string): number => {
	const ins = parseInput(input);
	reBuildMap(ins);
	moveRobot(ins);
	return calcBoxSum(ins.maze, '[');
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
