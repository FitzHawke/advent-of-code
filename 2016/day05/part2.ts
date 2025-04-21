import { md5Hash, parseInput } from './part1.ts';

const crackPass = (str: string): string => {
	const code: string[] = Array(8).fill('');
	let i = 0;
	let found = 0;

	while (found < 8) {
		const testval = `${str}${i}`;
		const hash = md5Hash(testval);
		if (hash.startsWith('00000')) {
			const loc = Number(hash[5]);
			if (loc >= 0 && loc < 8 && code[loc] === '') {
				code[loc] = hash[6];
				found++;
			}
		}

		i++;
	}

	return code.join('');
};

const main = (input: string): string => {
	const doorID = parseInput(input);
	return crackPass(doorID);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
