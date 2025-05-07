export const parseInput = (input: string): string => {
	return input.trimEnd();
};

export const findSequence = (str: string, idx: number): number[] => {
	const tmpStr = str.slice(idx + 1);
	const [a, b] = tmpStr.split(')')[0].split('x');
	const c = a.length + b.length + 2;
	return [Number(a), Number(b), c];
};

const findDecomLength = (compressed: string): number => {
	let length = 0;

	for (let i = 0; i < compressed.length; i++) {
		if (compressed[i] === '(') {
			const [a, b, c] = findSequence(compressed, i);
			i += a + c;
			length += a * b;
		} else length += 1;
	}

	return length;
};

const main = (input: string): number => {
	const compressedStr = parseInput(input);
	return findDecomLength(compressedStr);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
