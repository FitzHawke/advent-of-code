export const parseInput = (input: string): string => {
	return input.trim().split('\n').join('');
};

export const testInstructions = (
	instructions: string,
	doAll: boolean,
): number => {
	const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/gm;
	const splitInstructions = instructions.matchAll(regex);

	let goTime = true;
	let sum = 0;
	for (const ins of splitInstructions) {
		if (ins[0] === 'do()' && !doAll) goTime = true;
		else if (ins[0] === "don't()" && !doAll) goTime = false;

		if (goTime && ins[0][0] === 'm') {
			const nums = ins[0].slice(4, -1).split(',').map(Number);
			sum += nums[0] * nums[1];
		}
	}

	return sum;
};

const main = (input: string): number => {
	const instructions = parseInput(input);
	return testInstructions(instructions, true);
};

export default function (input: string, title: string): number {
	console.log(`\nDay ##: ${title}\nPart A`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
