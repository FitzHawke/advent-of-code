export const parseInputs = (inputs: string): string[] => {
	return inputs.trim().split('\n');
};

export const findNumbers = (lines: string[]): number[] => {
	const lineNumbers: number[] = [];
	lines.map((curLine) => {
		let first = 0,
			last = 0;
		for (const char of curLine) {
			if (!isNaN(+char)) {
				last = +char;
				if (first === 0) first = +char;
			}
		}
		lineNumbers.push(first * 10 + last);
	});
	return lineNumbers;
};

const main = (input: string): number => {
	return findNumbers(parseInputs(input)).reduce((acc, cur) => (acc += cur), 0);
};

export default function (input: string): number {
	console.log('\nDay 01: Trebuchet?!\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
