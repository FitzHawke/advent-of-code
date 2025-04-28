import { parseInput } from './part1.ts';

const findMessage = (badMessages: string[]): string => {
	let message = '';

	for (let i = 0; i < badMessages[0].length; i++) {
		const hash = new Map<string, number>();

		for (const curMessage of badMessages) {
			const cur = curMessage[i];
			if (hash.has(cur)) hash.set(cur, hash.get(cur) + 1);
			else hash.set(cur, 1);
		}

		let letter = '';
		let occurrences = Infinity;

		for (const [key, val] of hash) {
			if (val < occurrences) {
				occurrences = val;
				letter = key;
			}
		}

		message += letter;
	}

	return message;
};

const main = (input: string): string => {
	const messages = parseInput(input);
	return findMessage(messages);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
