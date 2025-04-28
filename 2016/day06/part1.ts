export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

const findMessage = (badMessages: string[]): string => {
	let message = '';

	for (let i = 0; i < badMessages[0].length; i++) {
		const hash = new Map<string, number>();
		let letter = '';
		let occurrences = 0;

		for (const curMessage of badMessages) {
			const cur = curMessage[i];
			if (hash.has(cur)) hash.set(cur, hash.get(cur) + 1);
			else hash.set(cur, 1);

			if (hash.get(cur) > occurrences) {
				letter = cur;
				occurrences = hash.get(cur);
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
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
