import { directions, findWeight, parseInput, tiltPlatform } from "./partA.js";

const main = (input: string): number => {
	const platform = parseInput(input);
	const tilt = tiltPlatform(Object.values(directions), 1000000000);
	return findWeight(tilt(platform));
};

export default function (input: string): number {
	console.log('\nDay 14: Parabolic Reflector Dish\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
