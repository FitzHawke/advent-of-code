import { parseInput, testInstructions } from "./partA.js";

const main = (input: string): number => {
	const instructions = parseInput(input);
	return testInstructions(instructions, false);
};

export default function (input: string, title:string): number {
	console.log(`\nDay ##: ${title}\nPart B`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
