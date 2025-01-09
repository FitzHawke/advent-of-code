import { parseInput, Robot } from './part1.ts';

const idFromCoord = (r: number, c: number): string => [r, c].join('_');

const genDirs = (): number[][] => {
	const dirs = [];
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (i || j) dirs.push([i, j]);
		}
	}
	return dirs;
};

const moveRobots = (robots: Robot[], w: number, h: number) => {
	for (const bot of robots) {
		bot.pX = (bot.pX + bot.vX + w) % w;
		bot.pY = (bot.pY + bot.vY + h) % h;
	}
};

const testAdj = (robots: Robot[]): boolean => {
	const dirs = genDirs();
	const locs = robots.reduce(
		(acc, bot) => acc.add(idFromCoord(bot.pX, bot.pY)),
		new Set<string>(),
	);
	let count = 0;
	for (const bot of robots) {
		let adj = false;
		for (const dir of dirs) {
			const newX = bot.pX + dir[0];
			const newY = bot.pY + dir[1];
			if (locs.has(idFromCoord(newX, newY))) {
				adj = true;
				break;
			}
		}
		if (adj) count++;
	}
	return count / locs.size > 0.7;
};

const main = (input: string, w: number, h: number): number => {
	const robots = parseInput(input);
	let i = 0;
	while (!testAdj(robots)) {
		moveRobots(robots, w, h);
		i++;
	}

	return i;
};

export default function (
	input: string,
	title: string,
	w: number,
	h: number,
): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, w, h);
	console.timeEnd('Time elapsed');
	return result;
}
