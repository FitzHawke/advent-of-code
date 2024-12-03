import { parseInput, testInstructions } from "./partA.js";

const main = (input: string): number => {
	const instructionSet = parseInput(input);
	return testInstructions(instructionSet, false)
};

export default function (input: string, title:string): number {
	console.log(`\nDay 03: ${title}\nPart B`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
