export type Robot = {
	pX: number;
	pY: number;
	vX: number;
	vY: number;
};

export const parseInput = (input: string): Robot[] => {
	const regex = /[+-]?\d+/g;
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			const [pX, pY, vX, vY] = [...cur.matchAll(regex)].map(Number);
			return { pX, pY, vX, vY } as Robot;
		});
};

const moveRobots = (robots: Robot[], w: number, h: number) => {
	for (const bot of robots) {
		bot.pX = (bot.pX + bot.vX + w) % w;
		bot.pY = (bot.pY + bot.vY + h) % h;
	}
};

const scoreSafety = (robots: Robot[], w: number, h: number): number => {
	let q1 = 0;
	let q2 = 0;
	let q3 = 0;
	let q4 = 0;
	const cX = (w - 1) / 2;
	const cY = (h - 1) / 2;
	for (const bot of robots) {
		if (bot.pX < cX && bot.pY < cY) q1++;
		if (bot.pX > cX && bot.pY < cY) q2++;
		if (bot.pX < cX && bot.pY > cY) q3++;
		if (bot.pX > cX && bot.pY > cY) q4++;
	}
	return q1 * q2 * q3 * q4;
};

const main = (input: string, w: number, h: number): number => {
	let robots = parseInput(input);
	for (let i = 0; i < 100; i++) {
		moveRobots(robots, w, h);
	}

	return scoreSafety(robots, w, h);
};

export default function (
	input: string,
	title: string,
	w: number,
	h: number,
): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, w, h);
	console.timeEnd('Time elapsed');
	return result;
}
