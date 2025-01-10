import {
	coordFromId,
	directions,
	idFromCoord,
	Maze,
	parseInput,
} from './part1.ts';

const findBestSeats = (maze: Maze): number => {
	const visited = new Map<string, [number, Set<string>]>();
	const queue: [string, string, number, Set<string>][] = [
		[maze.start, 'R', 0, new Set()],
	];
	let possibleSeats = 0;

	while (queue.length > 0) {
		const cur = queue.shift();
		const loc = cur[0];
		const [r, c] = coordFromId(loc);
		const curDir = cur[1];
		const curScore = cur[2];
		const visitId = [loc, curDir].join('.');
		let seats = cur[3];

		seats.add(loc);

		if (visited.has(visitId) && curScore > visited.get(visitId)[0]) continue;
		if (visited.has(visitId) && curScore === visited.get(visitId)[0]) {
			seats = new Set([...seats, ...visited.get(visitId)[1]]);
		}
		if (maze.map.get(loc) === 'E') {
			if (seats.size > possibleSeats) possibleSeats = seats.size;
			continue;
		}

		visited.set(visitId, [curScore, seats]);

		for (const [dir, move] of directions) {
			if (dir === curDir) {
				const newR = r + move[0];
				const newC = c + move[1];
				const newId = idFromCoord(newR, newC);
				if (maze.map.get(newId) !== '#') {
					queue.push([newId, dir, curScore + 1, new Set([...seats])]);
				}
			} else {
				queue.push([loc, dir, curScore + 1000, new Set([...seats])]);
			}
		}
	}

	return possibleSeats;
};

const main = (input: string): number => {
	const maze = parseInput(input);
	return findBestSeats(maze);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
