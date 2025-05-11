import { find64Key, md5Hash, parseInput } from './part1.ts';

const main = (input: string): number => {
	const salt = parseInput(input);
	const hashFunc = (str: string): string => {
		let curHash = md5Hash(str);
		for (let j = 0; j < 2016; j++) {
			curHash = md5Hash(curHash);
		}
		return curHash;
	};

	return find64Key(salt, hashFunc);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
