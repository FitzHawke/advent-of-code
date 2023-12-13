import { calculateValue, parseInput } from "./partA.js";

const main = (input: string): number => {
	const mirrors = parseInput(input);
	return mirrors.reduce((acc, cur) => (acc += calculateValue(cur,1)), 0);
};

export default function (input: string): number {
	console.log('\nDay 13: Point of Incidence\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
