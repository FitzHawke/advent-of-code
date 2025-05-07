import { findSequence, parseInput } from './part1.ts';

const decompress = (str: string): number => {
	let strLen = 0;

	for (let i = 0; i < str.length; i++) {
		if (str[i] === '(') {
			const [a, b, c] = findSequence(str, i);
			strLen += decompress(str.slice(i + c + 1, i + a + c + 1)) * b;
			i += a + c;
		} else strLen += 1;
	}

	return strLen;
};

const main = (input: string): number => {
	const compressedStr = parseInput(input);
	return decompress(compressedStr);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
