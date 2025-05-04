export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

const testSupport = (address: string): boolean => {
	let l = 0;
	let r = 3;
	let bracket = address
		.slice(0, 4)
		.split('')
		.some((char) => char === '[');
	let found = false;

	while (r < address.length) {
		if (address[l] === ']') bracket = false;
		if (address[r] === '[') bracket = true;

		const [l1, l2, l3, l4] = address.slice(l, r + 1).split('');

		if (l1 === l4 && l2 === l3 && l1 !== l2) {
			if (bracket) return false;
			found = true;
		}

		l++;
		r++;
	}

	return found;
};

const main = (input: string): number => {
	const addresses = parseInput(input);
	return addresses.reduce((acc, c) => (testSupport(c) ? acc + 1 : acc), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
