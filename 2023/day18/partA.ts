export const parseInput = (input: string): string[][] => {
	return [...input.split('\n').map((cur) => cur.match(/([A-Z0-9]*\w)/gi)!)];
};

export const directions = new Map<string, number[]>()
	.set('U', [-1, 0])
	.set('D', [1, 0])
	.set('L', [0, -1])
	.set('R', [0, 1]);

const findPoints = (instructions: string[][]): number[][] => {
	let curR = 0;
	let curC = 0;
	return instructions.map((cur) => {
		curR = curR + directions.get(cur[0])![0] * +cur[1]!;
		curC = curC + directions.get(cur[0])![1] * +cur[1]!;
		return [curR, curC, +cur[1]];
	});
};

export const pickShoelace = (points: number[][]): number => {
	let prevR = 0;
	let prevC = 0;
	const shoelace =
		points.reduce((acc, cur) => {
			acc += (cur[0] - prevR) * (cur[1] + prevC);
			prevC = cur[1];
			prevR = cur[0];
			return acc;
		}, 0) / 2;
	(prevR = 0), (prevC = 0);
	const walls = points.reduce((acc, cur) => acc + cur[2], 0);
	return shoelace + walls / 2 + 1;
};

const main = (input: string): number => {
	const instructions = parseInput(input);
	const points = findPoints(instructions);
	return pickShoelace(points);
};

export default function (input: string): number {
	console.log('\nDay 18: Lavaduct Lagoon\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
