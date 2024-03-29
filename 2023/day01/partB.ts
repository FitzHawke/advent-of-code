import { findNumbers, parseInputs } from './partA.js';

type numMap = { [key: string]: string };

// sometimes numbers text overlaps, adding the number to the middle of the text to make sure not to break written numbers while replacing
const numberMap: numMap = {
	one: 'o1ne',
	two: 't2wo',
	three: 'th3ree',
	four: 'fo4ur',
	five: 'fi5ve',
	six: 'si6x',
	seven: 'se7ven',
	eight: 'ei8ght',
	nine: 'ni9ne',
};

const replaceTextNums = (line: string): string => {
	let newLine = line;
	for (const numConv of Object.keys(numberMap)) {
		newLine = newLine.replaceAll(numConv, numberMap[numConv]);
	}
	return newLine;
};

const main = (input: string): number => {
	return findNumbers(
		parseInputs(input).map((cur) => replaceTextNums(cur)),
	).reduce((acc, cur) => (acc += cur), 0);
};

export default function (input: string): number {
	console.log('\nDay 01: Trebuchet?!\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
