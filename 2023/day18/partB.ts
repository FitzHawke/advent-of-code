import { directions, parseInput, pickShoelace } from "./partA.js";

const dirMap = new Map().set(0,'R').set(1,'D').set(2,'L').set(3,'U')

const findPoints = (instructions: string[][]): number[][] => {
	let curR = 0;
	let curC = 0;
	return instructions.map((cur) => {
		const dir = dirMap.get(+cur[2].slice(-1))!
		const num = parseInt(cur[2].slice(0,-1),16)
		curR = curR + directions.get(dir)![0] * num;
		curC = curC + directions.get(dir)![1] * num;
		return [curR, curC, num];
	});
};

const main = (input: string): number => {
	const instructions = parseInput(input);
	const points = findPoints(instructions);
	return pickShoelace(points);
};

export default function (input: string): number {
	console.log('\nDay 18: Lavaduct Lagoon\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
