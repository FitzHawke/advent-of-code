import { parseInput, walkGalaxies } from "./partA.js";

const main = (input: string, number:number): number => {
	const fullMap = parseInput(input);
	return walkGalaxies(fullMap, number);
};

export default function (input: string, number:number): number {
	console.log('\nDay 11: Cosmic Expansion\nPart B');
	const startTime = new Date();
	const result = main(input, number);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
