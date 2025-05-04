import { parseInput } from './part1.ts';

const testSSL = (address: string): boolean => {
	const splitAddress = address.replace(/\[|\]/g, ' ').split(' ');
	const sequences = new Set<string>();

	for (let i = 0; i < splitAddress.length; i += 2) {
		for (let j = 0; j < splitAddress[i].length - 2; j++) {
			const [l1, l2, l3] = splitAddress[i].slice(j, j + 3).split('');
			if (l1 === l3 && l1 !== l2) {
				const seq = [l2, l1, l2].join('');
				sequences.add(seq);
			}
		}
	}

	for (let i = 1; i < splitAddress.length; i += 2) {
		for (let j = 0; j < splitAddress[i].length - 2; j++) {
			const seq = splitAddress[i].slice(j, j + 3);
			if (sequences.has(seq)) return true;
		}
	}

	return false;
};

const main = (input: string): number => {
	const addresses = parseInput(input);
	return addresses.reduce((acc, c) => (testSSL(c) ? acc + 1 : acc), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
